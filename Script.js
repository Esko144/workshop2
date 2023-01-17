const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

 const dataTransaction = [] 

let transactions = dataTransaction;

function init(){
  list.innerHTML=''; //ต้องเปลี่ยน list เป็นค่าว่างก่อน 
  transactions.forEach(addDataToList);
  caluculateMoner();
}

function addDataToList(transactions){
  const symbol = transactions.amount < 0 ? `-` : `+`;
  const status = transactions.amount < 0 ? `minus`:`plus`  /* ถ้ามีค่าน้อยกว่า 0ให้เก็บไว้ใน minus ถ้าเป็น else ให้เก็บไว้ในplus */
  const item = document.createElement(`li`);
  result = formatNumber(Math.abs(transactions.amount));
  item.classList.add(status)
  item.innerHTML = `${transactions.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;
  list.appendChild(item)
}
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function autoID(){
  return Math.floor(Math.random()*1000000);
}



function caluculateMoner(){
  const amounts=transactions.map(transactions=>transactions.amount);
  //คำนวนยอดคงเหลือ 
  const total=amounts.reduce((result,item)=>(result+=item),0).toFixed(2);
  //คำนวณรายรับ
  const income= amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0).toFixed(2);
  //คำนวณรายจ่าย
  const expense= (amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0)*-1).toFixed(2);
  
  //แสดงผลทางจอภาพ
  balance.innerText=`฿`+formatNumber(total);
  money_plus.innerText=`฿`+formatNumber(income);
  money_minus.innerText=`฿`+formatNumber(expense);
}


function removeData(id){
  transactions=transactions.filter(transactions=>transactions.id !==id)  //remove ข้อมูล
  //2,3 => id = 1  
  init();


}


function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert("กรุณาป้อนข้อมูลให้ครบ");
  }else{
    const data={
      id:autoID(), //กำหนด object
      text:text.value, //ชื่อธุรกรรม
      amount:+amount.value   /* แปรง str เป็น int ด้วยการใส่ + */
    }
    transactions.push(data); 
    addDataToList(data); // คำนวณหา
    caluculateMoner(); // Update
    text.value=''; // clrscrค่า
    amount.value=''; // clrscrค่า
  }
}

form.addEventListener('submit',addTransaction);
init();


/* 
console.log(typeof(text.value));
console.log(typeof(+amount.value));  แปรง str เป็น int ด้วยการใส่ +
 */