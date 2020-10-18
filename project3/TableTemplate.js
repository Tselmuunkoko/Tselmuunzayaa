class TableTemplate{
    static fillIn(id,dict,column){
        var table = document.getElementById(id);
        table.style.visibility='visible';
        var rows = table.rows;
        var firstrow = rows.item(0);
        var templateprocess = new Cs142TemplateProcessor(firstrow.innerHTML);
        firstrow.innerHTML = templateprocess.fillIn(dict);
        var row,processor,i;
        console.log(column);
        console.log(table.rows.length);
        if(column===undefined){
            console.log("hi1");
            for(i = 1;i<rows.length;i++){
                row = rows.item(i);
                processor = new Cs142TemplateProcessor(row.innerHTML);
                row.innerHTML = processor.fillIn(dict);
            }
        }
        else if(column===firstrow.cells[0].innerHTML){
            console.log("hi2");
            for(i = 1;i<rows.length;i++){
                row = rows[i].cells[0];
                processor = new Cs142TemplateProcessor(row.innerHTML);
                row.innerHTML = processor.fillIn(dict);
            }
        }
        else if(column===firstrow.cells[1].innerHTML){
            console.log("hi3");
            for(i = 1;i<rows.length;i++){
                row = rows[i].cells[1];
                processor = new Cs142TemplateProcessor(row.innerHTML);
                row.innerHTML = processor.fillIn(dict);
            }
        }
    }
}
