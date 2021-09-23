import React, { useMemo } from 'react'
import { Store } from '../types/context'
import { useAppContext } from '../context/app-context'

export type MapStateToPropsFunction<T, U> = (state: Store.State, props: U) => T
export type MapDispatchToPropsFunction<T, U> = (dispatch: React.Dispatch<Store.Actions>, props: U) => T

const connect =
  <T, U, P extends T & U>(mapStateToProps: MapStateToPropsFunction<T, P>, mapDispatchToProps: MapDispatchToPropsFunction<U, P>) => {
    const hoc = (Component: React.FC<P>) => {
      const ConnectedComponent = (props: P) => {
        const { store: { state, dispatch } } = useAppContext()
        const componentState = useMemo(() => mapStateToProps(state, props), [props, state])
        const componentDispatch = useMemo(() => mapDispatchToProps(dispatch, props), [props, dispatch])

        return (
            <Component
              { ...props as P }
              { ...componentState }
              { ...componentDispatch }
            />
        )
      }
      return ConnectedComponent
    }
    return hoc
  }

export default connect
