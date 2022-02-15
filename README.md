boomboom trackr 💩

[![Netlify Status](https://api.netlify.com/api/v1/badges/8628f733-e2c4-4ab0-86e7-761029614924/deploy-status)](https://app.netlify.com/sites/cranky-goodall-99f809/deploys)

M mongodb atlas, free tier hosting
E
R react frontend hosted using netlify
N app_base_directory/netlify/functions

```json
{
    "boom_id": 1,
    "year_month": "2022/01",
    "booms": [
        {"day": 1, "time": "11:15"},
        {"day": 2, "time": "9:05"}
    ]
},
{
    "boom_id": 2,
    "year_month": "2022/02",
    "booms": [
        {"day": 1, "time": "11:15"},
        {"day": 2, "time": "9:05"}
    ]
}
```

#ede0d4
#e6ccb2
#ddb892
#b08968
#7f5539
#9c6644

## Resources

- charts library
  `https://recharts.org/en-US/examples/ThreeDimScatterChart`

## curl request to POST data to API

`bash curl -d '"{date: 2022/01, time: 1312}"' -H 'Content-Type: application/json' http://localhost:5000/api/data`

## Tag versions

`git tag -a v0.1 -m "alpha version of boomboomtrackr pushed to netlify"`
`git show v0.1`

## Netlify how to

`netlify dev`

## Todos

✅ converter of date+time into unix time for heatmap
✅ github contribution style graph https://codepen.io/ire/pen/Legmwo
✅ set startDate to 3 months before todays date
✅ set endDate to 1 month after todays date

🚧 implement dark/light mode toggle
🚧 build state store using Redux
