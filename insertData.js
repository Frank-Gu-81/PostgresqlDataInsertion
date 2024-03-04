const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '20020224', // Replace with your password
  database: 'scrape_data', // Replace with your database name
  port: 5432,
});

const jsonFilePath = __dirname + '/fixed_file.json'; 

const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, fileContents) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const data = JSON.parse(fileContents);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const insertData = async (data) => {
    try {
        await client.connect();
        await client.query('BEGIN');

        for (const item of data) {
          for (const edge of item.data.companiesList.edges) {
              const node = edge.node; 
              const queryText = 'INSERT INTO public.companies("permalinkName", id, name, "cloudinaryPublicId", "logoNeedsBorder", stage, "exitedOn", "hasOpenBid", "hasOpenOffer", "institutionalVwap", "recentInstitutionalFilingDate", "totalHoldings", "lastRoundPrice", "lastRoundPriceCalculated", "lastRoundName", "lastRoundDate", valuation, "lastRoundValuation", "priceStrength", "delayedPriceStrength", "outstandingShares", "waterfallAnalysisAvailable", "hasNoticePrices", "latestBestBidSnapshot", "latestBestOfferSnapshot", "delayedNoticePrice", "recentNoticePrices", __typename) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)';
              const values = [
              node.permalinkName,
              node.id,
              node.name,
              node.cloudinaryPublicId,
              node.logoNeedsBorder,
              node.stage,
              node.exitedOn,
              node.hasOpenBid,
              node.hasOpenOffer,
              node.institutionalVwap,
              node.recentInstitutionalFilingDate,
              node.totalHoldings,
              node.lastRoundPrice,
              node.lastRoundPriceCalculated,
              node.lastRoundName,
              node.lastRoundDate,
              node.valuation,
              node.lastRoundValuation,
              node.priceStrength,
              node.delayedPriceStrength,
              node.outstandingShares,
              node.waterfallAnalysisAvailable,
              node.hasNoticePrices,
              node.latestBestBidSnapshot,
              node.latestBestOfferSnapshot,
              node.delayedNoticePrice,
              node.recentNoticePrices,
              node.__typename
              ];
              await client.query(queryText, values);
          }
        }
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        await client.end();
      }
};

const main = async () => {
  try {
    const jsonData = await readJsonFile(jsonFilePath);
    await insertData(jsonData);
    console.log('Data has been successfully inserted into the database');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

main();