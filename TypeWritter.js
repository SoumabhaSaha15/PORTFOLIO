class Typewriter{
	constructor(element,interval){
		this.Element = element;
		this.Text = element.innerHTML;
		this.Interval = interval;
		this.Index = 0;
		this.Time =(this.Text.length*this.Interval) ;
		this.Repeatation=false;
	}
	Print(){
			if(this.Index<this.Text.length){
				this.Element.innerHTML += this.Text[this.Index];
				this.Index++;
				if(this.Index==this.Text.length){
					clearInterval(this.Set);
					this.Index=0;
				}
			}
	}
	Type(){
		this.Element.innerHTML = '';
		this.Set=setInterval(()=>{this.Print();},this.Interval);
	}
	RepeatType(TimeFactor=1.1){
        this.Repeatation=true;
		if(TimeFactor>1){
            this.TF=TimeFactor;
            this.Cycle=setInterval(() => {this.Type()}, this.Time*TimeFactor);
        }
        else{
            this.TF=1.1;
            this.Cycle=setInterval(() => {this.Type()}, this.Time*1.1);
        }
	}
    Stop(Loop=1){
        if (this.Repeatation){
            setTimeout(()=>{clearInterval(this.Cycle)},(Loop+1)*this.Time*this.TF);
			this.Element.innerHTML= this.Text;
        }
    }
}