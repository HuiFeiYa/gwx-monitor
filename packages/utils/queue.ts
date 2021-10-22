export class Queue {
  private micro!: Promise<void>
  private stack: any[] = []
  private isFlushing = false // 要执行 stack 函数队列时置为不可执行状态
  constructor() {
    if (!('Promise' in window)) return
    this.micro = Promise.resolve()
  }
  addFn(fn: () => void) {
    if (typeof fn !== 'function') return
    this.stack.push(fn)
    if (!this.isFlushing) {
      this.isFlushing = true
      this.micro.then(() => this.flushStack())
    }
  }
  // 清空栈中函数，重置 isFlushing 值
  flushStack() {
    const temp = this.stack.slice(0)
    this.stack.length = 0
    this.isFlushing = false
    for (let i = 0; i < temp.length; i++) {
      temp[i]()
    }
  }
}