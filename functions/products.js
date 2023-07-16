const dotenv = require("dotenv");
dotenv.config();

let Airtable = require("airtable-node");
const airtable = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_KEY })
  .base(process.env.REACT_APP_AIRTABLE_BASE)
  .table(process.env.REACT_APP_AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  try {
    const response = await airtable.list({ maxRecords: 200 });

    const products = response.records.map((product) => {
      const { id, fields } = product;
      const {
        name,
        featured,
        price,
        colors,
        company,
        description,
        category,
        shipping,
        images,
      } = fields;
      const { url } = images[0];

      return {
        id,
        featured: featured === undefined ? false : true,
        name,
        price,
        colors,
        company,
        description,
        category,
        shipping: shipping === undefined ? false : true,
        image: url,
      };
    });
    // console.log(products);
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "There was an error processing",
    };
  }
};

// REACT_APP_AIRTABLE_KEY
// REACT_APP_AIRTABLE_BASE
// REACT_APP_AIRTABLE_TABLE
