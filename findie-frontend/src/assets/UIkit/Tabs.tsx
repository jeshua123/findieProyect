import React, { ReactElement, useEffect, useState } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

export type TTab = {
  id: number
  icon?: ReactElement
  text: string
  isSelected?: boolean
  isTabHidden?: boolean
  action: (e: number) => void
}

type TTabs = {
  tabs: TTab[]
  variant?: 'contained' | 'default'
  className?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {
      display: 'flex',
      width: '100%',
      scrollSnapType: 'x mandatory',
      overflowX: 'auto',
      overflowY: 'hidden',
    },
    item: {
      flex: 'none',
      scrollSnapAlign: 'center',
    },
  })
)

const Tabs: React.FC<TTabs> = (props) => {
  const classes = useStyles()
  const [selectedTab, setSelectedTab] = useState<number | undefined>(setTabDefaultSelected())

  function setTabDefaultSelected() {
    const isDefaultSelected = props.tabs.find((iter: TTab) => iter.isSelected)
    return isDefaultSelected ? isDefaultSelected.id : undefined
  }

  const setTab = (tab: any) => {
    setSelectedTab(tab.id)
    tab.action(tab.id)
  }

  useEffect(() => {
    if (props.tabs.length > 0) {
      setSelectedTab(setTabDefaultSelected())
    }
  }, [props.tabs])

  return (
    <div className={`${props.className} ${classes.slider} h-12 hide-scroll-bar`}>
      {props.tabs.map((tab: TTab, i: number) => {
        const isSelected = selectedTab === tab.id
        const isLastTab = i + 1 === props.tabs.length

        const setTabStyle = () => {
          if (props.variant === 'contained' || !props.variant) {
            return `${
              isSelected
                ? 'bg-black text-white border-t border-b border-l border-gray-300'
                : 'border-t border-b border-l border-gray-300'
            } 
            ${isLastTab ? 'border border-gray-300' : 'border border-gray-300'}`
          }
          if (props.variant === 'default' || !props.variant) {
            return `${isSelected ? 'border-b-4 border-black' : 'border-b border-black'}`
          }
          return ''
        }

        return (
          <div key={tab.id} className={classes.item}>
            {!tab.isTabHidden && (
              <div className={`cursor-pointer flex h-full px-6 ${setTabStyle()}`} onClick={() => setTab(tab)}>
                {tab.icon && <span className={`flex self-center`}>{tab.icon}</span>}
                {tab.text && <span className={`subtitle4-medium flex self-center `}>{tab.text}</span>}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Tabs
