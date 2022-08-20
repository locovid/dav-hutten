# DAV Huts

Project to get notifications for DAV huts availability

I am lately into sleeping in the DAV huts, however i mostly spontaneously decide when and where to go based on multiple factors
like weather or simply my mood :)

The huts are usually full, specially on the weekend however but its very likely that some customers cancel. The main idea of this project its to get some push notification like slack, email or sms when my favorite huts get free slots

# How to run it

Te current version process is very manual, improvements are coming

1. Install yarn
   check the official [installation guide](https://classic.yarnpkg.com/en/docs/install)

2. Run locally

```sh
yarn dev
```

# Enrich huts file

Checking huts is limited to the huts in [this](./src/models/huts.js) file, add more in case the hut of interest is not there
to get the ID use the search browser and navigate to the wep page to reserve the desired hut, then check the URL and get the ID from
the query params

example for Höllentalangerhütte the ulr is https://www.alpsonline.org/reservation/calendar?hut_id=73 and the id is 73

# How to add your huts and dates

limitation! this version only check dates within a range of 13 days, future versions will fix that

enrich or edit the `hutsToWatch` and `datesToWatch` arrays in [app.js](./app.js)
