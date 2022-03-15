/**
 * Class에서 public, private, getter, setter
 */
 console.log("==== ✂️ Class에서 public, private, getter, setter")

 // type Role = "Operator" | "Supporter" | "Developer";
 enum Role { operator = "Operator", supporter = "Supporter", developer = "Developer" }


 class DanbiBase {
   name: string = "";
   role: Role = Role.developer;
   #age: number = 0;
   constructor(name: string, age: number, role: Role) {
     this.name = name;
     this.age = age;
     this.role = role;
   }
   get age() {
     return this.#age
   }
   set age(inputAge: number) {
     this.#age = inputAge < 0 ? 0 : inputAge;
   }
 }
 
 const eunchurn = new DanbiBase("eunchurn", 40, Role.developer);
 console.log(eunchurn)
 
//  /**
//   * Class 상속, 오버라이딩
//   */
 
 class DanbiDeveloper extends DanbiBase {}