## Postgresql Database Config
Please config your database with the following column attributes:
```
permalinkName,
id,
name,
cloudinaryPublicId,
logoNeedsBorder,
stage,
exitedOn,
hasOpenBid,
hasOpenOffer,
institutionalVwap,
recentInstitutionalFilingDate,
totalHoldings,
lastRoundPrice,
lastRoundPriceCalculated,
lastRoundName,
lastRoundDate,
valuation,
lastRoundValuation,
priceStrength,
delayedPriceStrength,
outstandingShares,
waterfallAnalysisAvailable,
hasNoticePrices,
latestBestBidSnapshot,
latestBestOfferSnapshot,
delayedNoticePrice,
recentNoticePrices,
__typename
```

## Postgresql JS Side Config
```
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'password', // Replace with your password
  database: 'companies', // Replace with your database name
  port: 5432,
});
```

## Note: Data is assumed to be stored in JSON format


## In terminal, type "node insertData.json" to run the insertion
