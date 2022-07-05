const moment = require('moment');

 export  const DateFormat = str => {
    const newDate = moment(str).format("dddd, MMMM Do YYYY");
    
    return newDate
}
