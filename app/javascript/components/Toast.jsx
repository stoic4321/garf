import React, {useEffect} from 'react';

const Toast = ({ toast, setToast }) => {
  const { text, variant, show } = toast

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setToast({
          show: false
        })
      }, 5 * 1000)
    }
  }, [toast.show])

  return (
    <div className={`cc-toast bg-${variant} row align-items-center justify-content-evenly m-0`}>
      <h4 className='m-0'>{text}</h4>
      <button
        onClick={() => {
          setToast({ show: false, text: '' })
        }}
        className='btn remove-btn-styles h3-font-size text-secondary'>
        &times;
      </button>
    </div>
  )
}
export default Toast