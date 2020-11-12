const $=require("jquery");
let db;
let lsc;

$("document").ready(function(){
    //when any cell is clicked address of that cell is calculated in the function which gives value to the address input 
    $(".cell").on("click",function(){
        //console.log(this) //gets current element
        let rowId=Number($(this).attr("rid"))+1;
        let colId=Number($(this).attr("cid"));
        let cellAddress=String.fromCharCode(65+colId) + rowId;
       console.log("rowId ",rowId);
       console.log("colId ",colId);

        console.log(cellAddress);
        $("#address").val(cellAddress);






    });
    //setting the value of value in db after typing value
    $(".cell").on("blur",function(){
        lsc=this;
       let value= $(this).text();
       let rowId=Number($(this).attr("rid"));
       let colId=Number($(this).attr("cid"));
       let cellObject=db[rowId][colId];
       cellObject.value=value;
       console.log(cellObject);
       console.log(db)


    });
    function init(){
        db=[];
        for(let i=0;i<100;i++){
            let row=[];
            for(let j=0;j<26;j++){
                let cellAddress=String.fromCharCode(65+j)+(i+1);
               let cellObject={
                 name:cellAddress,
                 value:"" ,
                 formula:" "

               }
               row.push(cellObject);
            }

            db.push(row);
            
        }
        

    }
    init();

});