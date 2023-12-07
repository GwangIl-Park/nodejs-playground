class Profiler{
  constructor(label){
    this.label = label;
    this.lastTime = null;
  }
  start(){
    this.lastTime = process.hrtime();
  }
  end(){
    const diff = process.hrtime(this.lasttime);
    return diff;
  }
}