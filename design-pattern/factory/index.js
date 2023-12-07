function createPerson(name){
  const privateProperties = {};
  
  const person = {
    setName : name => {
      if(!name)
        throw new Error('Must have name') // name이 단순 person의 속성일 경우 강제할 수 없다!
      privateProperties.name = name;
    },
    getName : () => {
      return privateProperties.name;
    }
  };
  
  person.setName(name);
  return person;
}

const person = createPerson("aa");

person.setName("BB")

console.log(person.getName())