import { useState, useEffect } from "react"

export enum Direction {
  INIT,
  UP,
  DOWN
}

export default function useScrollDirection() {
  const [direction, setDirection] = useState(Direction.INIT)
  useEffect(() => {
    let previous = 0
    let current = 0
    const handler = () => {
      current = window.pageYOffset
      if (previous - current < 0) {
        setDirection(Direction.UP)
      } else if (previous - current > 0) {
        setDirection(Direction.DOWN)
      }
      previous = current
    }
    window.addEventListener("scroll", handler)
    return () => {
      window.removeEventListener("scroll", handler)
    }
  }, [])

  return direction
}
