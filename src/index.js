const out = XLSX.read("../data/Asset_Details_Template (36) (4).xlsx")

console.log(out)

// async function process_RS(stream) {
//     /* collect data */
//     const buffers = [];
//     const reader = stream.getReader();
//     for(;;) {
//       const res = await reader.read();
//       if(res.value) buffers.push(res.value);
//       if(res.done) break;
//     }
  
//     /* concat */
//     const out = new Uint8Array(buffers.reduce((acc, v) => acc + v.length, 0));
  
//     let off = 0;
//     for(const u8 of arr) {
//       out.set(u8, off);
//       off += u8.length;
//     }
  
//     return out;
//   }

// async function getExcelFile() {
//     const res = await fetch('/data/Sale Report_F_B.xlsx');
//     // const binData = await (await (await res.body.getReader()).read()).value
//     // console.log(binData)

//     const data = await process_RS(res.body);
//     let workbook = XLSX.read(data)
//     const firstSheetName = workbook.SheetNames[0];
//     console.log(firstSheetName)
// }

// getExcelFile()






const fetchData = async () => {
    const response = await fetch('/data/Sale Report_F_B2.xlsx');
    return response;
  };
  
  const parseExcel = async () => {
    const stream = await fetchData();
    const arrayBuffer = await stream.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const arr = new Array();
    for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    const bstr = arr.join('');
    const workbook = XLSX.read(bstr, { type: 'binary' });
    const sheet = workbook.Sheets;
    console.log(sheet)
    // const sheetName = Object.keys(sheet)[0];
    const json = XLSX.utils.sheet_to_json(workbook.Sheets['Sales Data']);
    console.log(json);
  };
  
  parseExcel();








// alasql(['SELECT * FROM XLS("../data/Sale Report_F_B.xlsx")'])
//     .then(function(res){
//         console.log(res); // output depends on mydata.xls
//     }).catch(function(err){
//         console.log('Does the file exist? There was an error:', err);
//     })