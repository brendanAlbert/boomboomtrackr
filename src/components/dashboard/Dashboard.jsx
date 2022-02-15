import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { calculateTimeSinceLastBoomBoom } from "../../utilities/utilities";
import HeatMap2 from "../heatmap2/HeatMap2";

export const Dashboard = ({ bmbmdata }) => {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(-1);
  const [earliest, setEarliest] = useState(-1);
  const [mean, setMean] = useState(-1);
  const [timeSince, setTimeSince] = useState(-1);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    setData(bmbmdata);

    if (bmbmdata.length > 0) {
      setLatest(
        bmbmdata.map((bmbm) => bmbm.time).reduce((a, b) => Math.max(a, b))
      );
      setEarliest(
        bmbmdata.map((bmbm) => bmbm.time).reduce((a, b) => Math.min(a, b))
      );
      setMean(
        parseInt(
          bmbmdata
            .map((bmbm) => bmbm.time)
            .reduce((prev, curr) => prev + curr) / bmbmdata.length
        )
      );

      const { hours } = calculateTimeSinceLastBoomBoom(
        bmbmdata[bmbmdata.length - 2],
        bmbmdata[bmbmdata.length - 1]
      );

      setTimeSince(hours);

      setLoaded(true);
    }
  }, [bmbmdata]);

  const addColonToTime = (time) => {
    let strtime = "" + time;
    return strtime.length == 3
      ? strtime.slice(0, 1) + ":" + strtime.slice(-2)
      : strtime.slice(0, 2) + ":" + strtime.slice(-2);
  };

  const renderLineChart = (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width="100" height={300} data={data}>
        <Line type="monotone" dataKey="time" stroke="#9c6644" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );

  const boomboomstats2 = (
    <>
      <div className="row row-cols-1 row-cols-md-2 g-3 mb-2">
        <div className="col">
          <div className="card minwidth maxwidth">
            <div className="card-body d-flex flex-column align-items-center">
              <p className="card-text">
                {" "}
                <span className="badge bg-success rounded-pill fontsize-24">
                  {addColonToTime(earliest)}
                </span>
              </p>
              <h5 className="card-title">Earliest</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card minwidth maxwidth">
            <div className="card-body d-flex flex-column align-items-center">
              <p className="card-text">
                {" "}
                <span className="badge bg-warning rounded-pill fontsize-24">
                  {addColonToTime(latest)}
                </span>
              </p>
              <h5 className="card-title">Latest</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card minwidth maxwidth">
            <div className="card-body d-flex flex-column align-items-center">
              <p className="card-text">
                {" "}
                <span className="badge bg-secondary rounded-pill fontsize-24">
                  {addColonToTime(mean)}
                </span>
              </p>
              <h5 className="card-title">Average</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card minwidth maxwidth">
            <div className="card-body d-flex flex-column align-items-center">
              <p className="card-text">
                {" "}
                <span className="badge bg-primary rounded-pill fontsize-24">
                  {timeSince}
                </span>
              </p>
              <h5 className="card-title">⏱ since 💩</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section className="mb-5 col-xl-10 col-lg-10 col-md-10 container-fluid d-flex flex-column align-items-center">
      {loaded && (
        <>
          {boomboomstats2}
          <HeatMap2 bmbmdata={bmbmdata} />
          <div style={{ width: "95vw", marginLeft: "-24px" }}>
            {renderLineChart}
          </div>
        </>
      )}
      {!loaded && (
        <div
          className="spinner-grow"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </section>
  );
};
