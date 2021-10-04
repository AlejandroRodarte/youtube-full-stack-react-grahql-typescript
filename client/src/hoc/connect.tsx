import React, { useMemo } from 'react'
import { Store } from '../types/context'
import { useAppContext } from '../context/app-context'

export type MapStateToPropsFunction<T> = (state: Store.State) => T
export type MapDispatchToPropsFunction<T> = (dispatch: React.Dispatch<Store.Actions>) => T

const connect =
  <T, U, P extends T & U>(mapStateToProps?: MapStateToPropsFunction<T>, mapDispatchToProps?: MapDispatchToPropsFunction<U>) => {
    const hoc = (Component: React.FC<P>) => {
      const ConnectedComponent = (props: P) => {
        const { store: { state, dispatch } } = useAppContext()

        const componentState = useMemo(() => {
          if (mapStateToProps) return mapStateToProps(state)
          else return {}
        }, [state])

        const componentDispatch = useMemo(() => {
          if (mapDispatchToProps) return mapDispatchToProps(dispatch)
          else return {}
        }, [dispatch])

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
