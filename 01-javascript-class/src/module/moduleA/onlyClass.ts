class ModuleTest {
  #secret = "secret"
  publicVariable = "public"
  print() {
    console.log({publicVariable: this.publicVariable, private: this.#secret})
  }
}

export const classLike = new ModuleTest();
