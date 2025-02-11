import { useEffect } from 'react'
import { useSnackbar } from 'notistack'

// selectors
// import { notificationsSelector } from 'selectors/app.selector';

// actions
// import { removeSnackbar } from 'actions/app.action';

let displayed: any[] = []

const Snackbar = () => {
  // const notifications = useSelector(notificationsSelector);
  const { enqueueSnackbar } = useSnackbar()

  const storeDisplayed = (id: string | number) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id: string | number) => {
    displayed = [...displayed.filter((key) => id !== key)]
  }

  useEffect(() => {
    Object.values([]).forEach((ele: any) => {
      // do nothing if snackbar is already displayed
      if (displayed.includes(ele.key)) return

      // display snackbar using notistack
      enqueueSnackbar(ele.message, {
        key: ele.key,
        variant: ele.variant,
        onExited: (_: Event | null, keySnackBar: string | number) => {
          // dispatch(removeSnackbar(keySnackBar));
          removeDisplayed(keySnackBar)
        }
      })

      // keep track of snackbars that we've displayed
      storeDisplayed(ele.key)
    })
  }, [[], enqueueSnackbar])

  return null
}

export default Snackbar
