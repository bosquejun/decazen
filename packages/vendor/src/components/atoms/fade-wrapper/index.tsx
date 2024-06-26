import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

type FadeProps = {
  isVisible: boolean
  isFullScreen?: boolean
  start?: string
  transitionClass?: string
  end?: string
  classname?: string
  children?: React.ReactNode
}

const Fade: React.FC<FadeProps> = ({
  isVisible,
  start,
  end,
  classname,
  children,
  isFullScreen = false,
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show && !isVisible) {
      setTimeout(() => setShow(false), 100)
    } else {
      setShow(isVisible)
    }
  })

  const classes = {
    [start || 'scale-[0.98] opacity-0']: !isVisible,
    [end || 'scale-100 opacity-100']: isVisible,
    'absolute inset-0': show && isFullScreen,
  }

  return (
    <div
      className={clsx('z-50 transition-all duration-100', classes, classname)}
    >
      {show ? children : null}
    </div>
  )
}

export default Fade
