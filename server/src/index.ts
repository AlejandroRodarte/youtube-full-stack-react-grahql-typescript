import 'reflect-metadata'

import createApp from './create-app'

const main = async (): Promise<Error | undefined> => {
  const port = +(process.env.PORT || '3001')
  const [app, appError] = await createApp()
  if (typeof app === 'undefined') return appError
  app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
  })
  return undefined
}

main().then((error) => {
  if (error) console.log(error)
})
