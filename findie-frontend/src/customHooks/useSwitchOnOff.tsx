import { useState } from 'react'

import { Box, Switch as InputSwitch } from '@material-ui/core'

const useSwitchOnOff = () => {
  const [switchState, setSwitchState] = useState<boolean>(false)

  const render = () => {
    return (
      <Box className='flex ml-4'>
        <span className='body2-medium mt-2'>off</span>
        <InputSwitch
          color='primary'
          checked={switchState}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSwitchState(e.target.checked)}
        />
        <span className='body2-medium mt-2'>on</span>
      </Box>
    )
  }

  return { render, switchState, setSwitchState }
}

export default useSwitchOnOff
