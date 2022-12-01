import "./HeatMap2.css";
import "./Square.css";

export default function HeatMap2({ bmbmdata }) {
    const daysarray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsarray = [
        {
            index: 0,
            month: "Jan",
            days: 31,
        },
        {
            index: 1,
            month: "Feb",
            days: new Date().getFullYear() % 4 == 0 ? 29 : 28,
        },
        {
            index: 2,
            month: "Mar",
            days: 31,
        },
        {
            index: 3,
            month: "Apr",
            days: 30,
        },
        {
            index: 4,
            month: "May",
            days: 31,
        },
        {
            index: 5,
            month: "Jun",
            days: 30,
        },
        {
            index: 6,
            month: "Jul",
            days: 31,
        },
        {
            index: 7,
            month: "Aug",
            days: 31,
        },
        {
            index: 8,
            month: "Sep",
            days: 30,
        },
        {
            index: 9,
            month: "Oct",
            days: 31,
        },
        {
            index: 10,
            month: "Nov",
            days: 30,
        },
        {
            index: 11,
            month: "Dec",
            days: 31,
        },
    ];

    const append0 = (number) => (number < 10 ? "0" + number : number);

    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    const currentMonthIndex = new Date().getMonth();
    const threeMonthsAgoIndex =
        currentMonthIndex == 2
            ? 11
            : currentMonthIndex == 1
            ? 10
            : currentMonthIndex == 0
            ? 9
            : currentMonthIndex - 3;
    const twoMonthsAgoIndex =
        currentMonthIndex == 1
            ? 11
            : currentMonthIndex == 0
            ? 10
            : currentMonthIndex - 2;
    const oneMonthAgoIndex =
        currentMonthIndex == 0 ? 11 : currentMonthIndex - 1;
    const nextMonthIndex = (currentMonthIndex + 1) % 12;

    let thirdMonthAgo = [...Array(monthsarray[threeMonthsAgoIndex].days)].map(
        (_, i) => ({
            boom: bmbmdata.some(
                (bmbm) =>
                    bmbm.date ==
                    `${
                        [0, 1, 2].includes(currentMonthIndex)
                            ? lastYear
                            : currentYear
                    }/${append0(threeMonthsAgoIndex + 1)}/${append0(i + 1)}`
            ),
            date: `${
                [0, 1, 2].includes(currentMonthIndex) ? lastYear : currentYear
            }/${append0(threeMonthsAgoIndex + 1)}/${append0(i + 1)}`,
        })
    );

    let secondMonthAgo = [...Array(monthsarray[twoMonthsAgoIndex].days)].map(
        (_, i) => ({
            boom: bmbmdata.some(
                (bmbm) =>
                    bmbm.date ==
                    `${
                        [0, 1].includes(currentMonthIndex)
                            ? lastYear
                            : currentYear
                    }/${append0(twoMonthsAgoIndex + 1)}/${append0(i + 1)}`
            ),
            date: `${
                [0, 1].includes(currentMonthIndex) ? lastYear : currentYear
            }/${append0(twoMonthsAgoIndex + 1)}/${append0(i + 1)}`,
        })
    );

    let oneMonthAgo = [...Array(monthsarray[oneMonthAgoIndex].days)].map(
        (_, i) => ({
            boom: bmbmdata.some(
                (bmbm) =>
                    bmbm.date ==
                    `${
                        [0].includes(currentMonthIndex) ? lastYear : currentYear
                    }/${append0(oneMonthAgoIndex + 1)}/${append0(i + 1)}`
            ),
            date: `${
                [0].includes(currentMonthIndex) ? lastYear : currentYear
            }/${append0(oneMonthAgoIndex + 1)}/${append0(i + 1)}`,
        })
    );

    let currentMonth = [...Array(monthsarray[currentMonthIndex].days)].map(
        (_, i) => ({
            boom: bmbmdata.some(
                (bmbm) =>
                    bmbm.date ==
                    `${currentYear}/${append0(currentMonthIndex + 1)}/${append0(
                        i + 1
                    )}`
            ),
            date: `${currentYear}/${append0(currentMonthIndex + 1)}/${append0(
                i + 1
            )}`,
        })
    );

    let nextMonth = [...Array(monthsarray[nextMonthIndex].days)].map(
        (_, i) => ({
            boom: bmbmdata.some(
                (bmbm) =>
                    bmbm.date ==
                    `${
                        nextMonthIndex === 0 ? currentYear + 1 : currentYear
                    }/${append0(nextMonthIndex + 1)}/${append0(i + 1)}`
            ),
            date: `${
                nextMonthIndex === 0 ? currentYear + 1 : currentYear
            }/${append0(nextMonthIndex + 1)}/${append0(i + 1)}`,
        })
    );

    let combinedbmbms = [
        thirdMonthAgo,
        secondMonthAgo,
        oneMonthAgo,
        currentMonth,
        nextMonth,
    ].flat(1);
    // To ensure the dates are matching the day of the week
    combinedbmbms = combinedbmbms.slice(6);

    const monthDictionary = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec",
    };

    let adjacentMonthsArray = [
        monthDictionary[threeMonthsAgoIndex],
        monthDictionary[twoMonthsAgoIndex],
        monthDictionary[oneMonthAgoIndex],
        monthDictionary[currentMonthIndex],
        monthDictionary[nextMonthIndex],
    ];

    const months = (
        <ul className="months">
            {adjacentMonthsArray.map((month, i) => (
                <li key={i}>{month}</li>
            ))}
        </ul>
    );

    const days = (
        <ul className="days">
            {daysarray.map((day, i) => (
                <li key={i}>{day}</li>
            ))}
        </ul>
    );

    const squares = (
        <ul className="squares">
            {combinedbmbms.map((bmbmevent, i) => {
                return (
                    <li
                        className="popupdate"
                        key={bmbmevent.date}
                        boom-month={bmbmevent.date.split("/")[1]}
                        boom-date={bmbmevent.date}
                        boom-value={bmbmevent.boom ? 1 : 0}
                    ></li>
                );
            })}
        </ul>
    );

    return (
        <div className="heatMapGraph">
            {months}
            {days}
            {squares}
        </div>
    );
}
