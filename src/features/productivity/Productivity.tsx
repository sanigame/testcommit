import React, { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'

import { useAppSelector } from '../../hooks/store'

function Productivity() {
  const { list } = useAppSelector((state) => state.issueList)
  const [allIssueCount, setAllIssueCount] = useState(0)
  const [storyClose, setStoryClose] = useState(0)
  const [storyDone, setStoryDone] = useState(0)
  const [subtaskDone, setSubtaskDone] = useState(0)
  const [sitDefectClosed, setSitDefectClosed] = useState(0)
  const [uatDefectClosed, setUatDefectClosed] = useState(0)
  const [prodDefectClosed, setProdDefectClosed] = useState(0)
  const [criticalIssueDefect, setCriticalIssueDefect] = useState(0)
  const [highIssueDefect, setHighIssueDefect] = useState(0)
  const [mediumIssueDefect, setMediumIssueDefect] = useState(0)
  const [lowIssueDefect, setLowIssueDefect] = useState(0)
  const [changeRequirementClosed, setChangeRequirementClosed] = useState(0)
  const [changeHighRequirement, setChangeHighRequirement] = useState(0)
  const [changeMediumRequirement, setChangeMediumRequirement] = useState(0)
  const [changeLowRequirement, setChangeLowRequirement] = useState(0)

  const [measurable, setMeasurable] = useState(0)
  const [defect, setDefect] = useState(0)
  const [changeRequirement, setChangeRequirement] = useState(0)

  const [allStorypoint, setAllStorypoint] = useState(200)
  const [avgStorypoint, setAvgStorypoint] = useState(0)
  const [issueTime, setIssueTime] = useState(320)

  const [productivity, setProductivity] = useState(0)

  useEffect(() => {
    // list.forEach((issue) => {
    //   // console.log('type', issue.fields.issuetype.name, issue.fields.status.name)
    //   // if (issue.fields.issuetype.name === 'SIT Defect') {
    //   //   console.log('issue', issue.fields.priority.name)
    //   // }
    // })

    const storyClosed = list.filter(
      (issue) => issue.fields.issuetype.name === 'Story' && issue.fields.status.name === 'Closed',
    )
    const storyDone = list.filter(
      (issue) => issue.fields.issuetype.name === 'Story' && issue.fields.status.name === 'Done',
    )
    const subtaskDone = list.filter(
      (issue) =>
        issue.fields.issuetype.name === 'Sub-task' &&
        issue.fields.status.name === 'Done' &&
        issue.fields.summary.indexOf('QA') === -1,
    )
    const sitDefectClosed = list.filter(
      (issue) =>
        issue.fields.issuetype.name === 'SIT Defect' && issue.fields.status.name === 'Closed',
    )
    const uatDefectClosed = list.filter(
      (issue) =>
        issue.fields.issuetype.name === 'UAT Defect' && issue.fields.status.name === 'Closed',
    )
    const prodDefectClosed = list.filter(
      (issue) =>
        issue.fields.issuetype.name === 'Production Defect' &&
        issue.fields.status.name === 'Closed',
    )
    const criticalIssueDefect = list.filter(
      (issue) => issue.fields.priority.name === 'Critical' && issue.fields.status.name === 'Closed',
    )
    const highIssueDefect = list.filter(
      (issue) => issue.fields.priority.name === 'High' && issue.fields.status.name === 'Closed',
    )
    const mediumIssueDefect = list.filter(
      (issue) => issue.fields.priority.name === 'Medium' && issue.fields.status.name === 'Closed',
    )
    const lowIssueDefect = list.filter(
      (issue) => issue.fields.priority.name === 'Low' && issue.fields.status.name === 'Closed',
    )
    const changeRequirement = list.filter(
      (issue) =>
        issue.fields.customfield_10513?.value === 'Change Requirement' &&
        issue.fields.status.name === 'Closed',
    )
    const changeHighRequirement = list.filter(
      (issue) =>
        issue.fields.priority.name === 'High' &&
        issue.fields.customfield_10513?.value === 'Change Requirement' &&
        issue.fields.status.name === 'Closed',
    )

    const changeMediumRequirement = list.filter(
      (issue) =>
        issue.fields.priority.name === 'Medium' &&
        issue.fields.customfield_10513?.value === 'Change Requirement' &&
        issue.fields.status.name === 'Closed',
    )

    const changeLowRequirement = list.filter(
      (issue) =>
        issue.fields.priority.name === 'Low' &&
        issue.fields.customfield_10513?.value === 'Change Requirement' &&
        issue.fields.status.name === 'Closed',
    )

    console.log('changeRequirement', changeRequirement)

    setAllIssueCount(list.length)
    setStoryClose(storyClosed.length)
    setStoryDone(storyDone.length)
    setSubtaskDone(subtaskDone.length)
    setSitDefectClosed(sitDefectClosed.length)
    setUatDefectClosed(uatDefectClosed.length)
    setProdDefectClosed(prodDefectClosed.length)
    setCriticalIssueDefect(criticalIssueDefect.length)
    setHighIssueDefect(highIssueDefect.length)
    setMediumIssueDefect(mediumIssueDefect.length)
    setLowIssueDefect(lowIssueDefect.length)
    setChangeRequirementClosed(changeRequirement.length)
    setChangeHighRequirement(changeHighRequirement.length)
    setChangeMediumRequirement(changeMediumRequirement.length)
    setChangeLowRequirement(changeLowRequirement.length)

    setMeasurable(storyClosed.length + storyDone.length + subtaskDone.length)
    setDefect(
      criticalIssueDefect.length * 3 +
        highIssueDefect.length * 2 +
        mediumIssueDefect.length * 1 +
        lowIssueDefect.length * 0.5,
    )
    setChangeRequirement(
      changeHighRequirement.length * 3 +
        changeMediumRequirement.length * 2 +
        changeLowRequirement.length * 1,
    )

    return () => {}
  }, [list])

  useEffect(() => {
    if (measurable !== 0) {
      const avgPoint = measurable / allStorypoint
      setAvgStorypoint(avgPoint)
    }

    return () => {}
  }, [measurable, allStorypoint])

  useEffect(() => {
    const prd = ((measurable - defect - changeRequirement) * avgStorypoint) / issueTime
    setProductivity(prd)

    return () => {}
  }, [measurable, defect, changeRequirement, avgStorypoint, issueTime])

  return (
    <div>
      {list.length > 0 ? (
        <div>
          <p>total issue: {allIssueCount}</p>
          -----------------
          <p>total story closed: {storyClose}</p>
          <p>total story done: {storyDone}</p>
          <p>total subtask done: {subtaskDone}</p>
          -----------------
          <p>total sit defect closed: {sitDefectClosed}</p>
          <p>total uat defect closed: {uatDefectClosed}</p>
          <p>total prod defect closed: {prodDefectClosed}</p>
          <br />
          <p>total critical defect closed: {criticalIssueDefect}</p>
          <p>total high defect closed: {highIssueDefect}</p>
          <p>total medium defect closed: {mediumIssueDefect}</p>
          <p>total low defect closed: {lowIssueDefect}</p>
          -----------------
          <p>total change requirement closed: {changeRequirementClosed}</p>
          <p>total change high requirement closed: {changeHighRequirement}</p>
          <p>total change medium requirement closed: {changeMediumRequirement}</p>
          <p>total change low requirement closed: {changeLowRequirement}</p>
          -----------------
          <p>
            M: total story closed: ({storyClose}) + total story done: ({storyDone}) + total subtask
            done: ({subtaskDone}) = {measurable}
          </p>
          <p>
            D: total critical defect closed: ({criticalIssueDefect})*3 + total high defect closed: (
            {highIssueDefect})*2 + total medium defect closed: ({mediumIssueDefect})*1 + total low
            defect closed: ({lowIssueDefect})*0.5 = {defect}
          </p>
          <p>
            S: total change high requirement closed: ({changeHighRequirement})*3 + total change
            medium requirement closed: ({changeMediumRequirement})*2 + total change low requirement
            closed: ({changeLowRequirement})*1 = {changeRequirement}
          </p>
          <div>
            Average story point: M ({measurable})/{' '}
            <TextField
              id="storypoint"
              label="All story point"
              variant="outlined"
              value={allStorypoint}
              onChange={(e) => setAllStorypoint(parseInt(e.target.value || '0'))}
            />{' '}
            = {avgStorypoint}
          </div>
          -----------------
          <div>
            Time(hour):{' '}
            <TextField
              id="hour"
              label="hour"
              variant="outlined"
              value={issueTime}
              onChange={(e) => setIssueTime(parseInt(e.target.value || '0'))}
            />{' '}
            = {issueTime}
          </div>
          -----------------
          <h3>calc = ((M-D-S)*Average story point)/Time</h3>
          <h3>
            (({measurable} - {defect} - {changeRequirement})*{avgStorypoint})/{issueTime}
          </h3>
          <h3>Productivity: {productivity}</h3>
        </div>
      ) : null}
    </div>
  )
}

export default Productivity
