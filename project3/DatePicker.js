
class DatePicker{
    constructor(div,func){
        this.div = div;
        this.callback = func;
        this.counter = 0;
        this.current = new Date();
    }
    render(date){
        var dt = new Date(date);
        var begindate = new Date(date);
        var enddate = new Date(date);
        if(this.counter === 0){
            this.current =dt;
        }
        this.counter++;
        begindate.setDate(dt.getDate()-dt.getDate()+1);
        begindate.setDate(begindate.getDate()-begindate.getDay());

        enddate.setDate(1);
        enddate.setMonth(enddate.getMonth()+1);
        enddate.setDate(enddate.getDate()-1);
        enddate.setDate(enddate.getDate()+6-enddate.getDay());

        console.log("date -- "+dt.getDate()+" "+dt.getMonth()+" "+dt.getDay());
        console.log("begin -- "+begindate.getDate()+" "+begindate.getMonth()+" "+begindate.getFullYear()+" "+begindate.getDay());
        console.log("end -- "+enddate.getDate()+" "+enddate.getMonth()+" "+enddate.getFullYear()+" "+enddate.getDay());    
        
        var wdays = ["Su","Mo","Tu","We","Th","Fr","Sa"];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var yearmonth = document.createElement("div");
        yearmonth.setAttribute("class","month");
        var calendar = document.getElementById(this.div);
        calendar.appendChild(yearmonth);
        var monthul = document.createElement("ul");
        yearmonth.appendChild(monthul);
        var monthli1 = document.createElement("li");
        monthli1.setAttribute("class","prev");
        var monthli2 = document.createElement("li");
        monthli2.setAttribute("class","next"); 
        var prev  = document.createTextNode("<");
        var next  = document.createTextNode(">");
        monthli1.appendChild(prev);
        monthli2.appendChild(next);
        
        monthli1.addEventListener("click", () => {
           let newdate = new Date(dt);
           newdate.setDate(1);
           newdate.setMonth(newdate.getMonth()-1);
           calendar.innerHTML = '';
           this.render(newdate);
        });

        monthli2.addEventListener("click", () => {
            let newdate = new Date(dt);
            newdate.setDate(1);
            newdate.setMonth(newdate.getMonth()+1);
            calendar.innerHTML = '';
            this.render(newdate);
        });
        var monthli3 = document.createElement("li");
        var spanmonth = document.createElement("span");
        var text = document.createTextNode(dt.getFullYear());
        var textmonth = document.createTextNode(months[dt.getMonth()]+" ");

        spanmonth.appendChild(text);
        monthli3.appendChild(textmonth);
        monthli3.appendChild(spanmonth);
        monthul.appendChild(monthli1);
        monthul.appendChild(monthli3);
        monthul.appendChild(monthli2);
        
        var ul = document.createElement("ul");
        ul.setAttribute("class","weekdays");
        calendar.appendChild(ul);
        var li = document.createElement("li");
        for(var i = 0; i<7; i++){
            li = document.createElement("li");
            text = document.createTextNode(wdays[i]);
            li.appendChild(text);
            ul.appendChild(li);
        }   
        var diffTime = Math.abs(begindate - enddate);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffDays + " days");
        while(diffDays>0){
            ul = document.createElement("ul");
            ul.setAttribute("class","days");
            calendar.appendChild(ul);
            for(i = 0; i<7; i++){
                li = document.createElement("li");
                diffDays=diffDays-1;
                text = document.createTextNode(begindate.getDate()+" ");
                if(begindate.getDate()===this.current.getDate()&&begindate.getMonth()===this.current.getMonth()&&begindate.getFullYear()===this.current.getFullYear()){
                    li.setAttribute("class","active");
                    let fixed = {
                        month: this.current.getMonth() + 1,
                        day: this.current.getDate(),
                        year: this.current.getFullYear()
                    };
                    li.addEventListener("click", () => {
                        this.callback(this.div, fixed);
                    });
                }
                if(begindate.getMonth()!==dt.getMonth()){
                    li.setAttribute("class","nonactive");
                }
                li.appendChild(text);
                ul.appendChild(li);
                begindate.setDate(begindate.getDate()+1);
            }
        }     
    }
}