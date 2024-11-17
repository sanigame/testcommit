import React, { useEffect, useState } from 'react'

import { useAppSelector } from '../../hooks/store'

type TeamType = { accountId: string; displayName: string }
function TeamInsights() {
  const { list } = useAppSelector((state) => state.issueList)
  const [teamData, setTeamData] = useState<TeamType[]>([])

  const renderIssueType = (accountId: string) => {
    const typeObj: { [k: string]: number } = {}
    const typeArr: { key: string; value: number }[] = []
    list.forEach((issue) => {
      if (issue.fields.assignee?.accountId === accountId) {
        if (!typeObj[issue.fields.issuetype.name]) {
          typeObj[issue.fields.issuetype.name] = 0
        }
        typeObj[issue.fields.issuetype.name] = typeObj[issue.fields.issuetype.name] + 1
      }
    })

    for (const [key, value] of Object.entries(typeObj)) {
      typeArr.push({
        key,
        value,
      })
    }
    return (
      <div>
        {typeArr.map((data, i) => (
          <p key={i}>
            {data.key} = {data.value}
          </p>
        ))}
      </div>
    )
  }

  const renderIssueStatus = (accountId: string) => {
    const typeObj: { [k: string]: number } = {}
    const typeArr: { key: string; value: number }[] = []
    list.forEach((issue) => {
      if (issue.fields.assignee?.accountId === accountId) {
        if (!typeObj[issue.fields.status.name]) {
          typeObj[issue.fields.status.name] = 0
        }
        typeObj[issue.fields.status.name] = typeObj[issue.fields.status.name] + 1
      }
    })

    for (const [key, value] of Object.entries(typeObj)) {
      typeArr.push({
        key,
        value,
      })
    }
    return (
      <div>
        {typeArr.map((data, i) => (
          <p key={i}>
            {data.key} = {data.value}
          </p>
        ))}
      </div>
    )
  }

  useEffect(() => {
    const teamObj: { [k: string]: string } = {}
    const teamArr: TeamType[] = []
    list.forEach((issue) => {
      if (issue.fields.assignee?.accountId) {
        teamObj[issue.fields.assignee?.accountId] = issue.fields.assignee?.displayName
      }
    })

    for (const [key, value] of Object.entries(teamObj)) {
      console.log(`${key}: ${value}`)
      teamArr.push({
        accountId: key,
        displayName: value,
      })

      // const typeObj: { [k: string]: number } = {}
      // const statusObj: { [k: string]: number } = {}
      // list.forEach((issue) => {
      //   if (issue.fields.assignee?.accountId === key) {
      //     if (!typeObj[issue.fields.issuetype.name]) {
      //       typeObj[issue.fields.issuetype.name] = 0
      //     }
      //     typeObj[issue.fields.issuetype.name] = typeObj[issue.fields.issuetype.name] + 1

      //     if (!statusObj[issue.fields.status.name]) {
      //       statusObj[issue.fields.status.name] = 0
      //     }
      //     statusObj[issue.fields.status.name] = statusObj[issue.fields.status.name] + 1
      //   }
      // })
      // const taskCount = list.filter((issue) => issue.fields.assignee?.accountId === key).length
      // console.log('taskCount', taskCount)
      // console.log('typeObj', typeObj)
      // console.log('statusObj', statusObj)

      // const taskCount = list.filter((issue) => issue.fields.assignee?.accountId === key).length
      // const openStatusCount = list.filter(
      //   (issue) => issue.fields.assignee?.accountId === key && issue.fields.status.name === 'Open',
      // ).length
      // const inProgressStatusCount = list.filter(
      //   (issue) =>
      //     issue.fields.assignee?.accountId === key && issue.fields.status.name === 'In progress',
      // ).length
      // const closeStatusCount = list.filter(
      //   (issue) =>
      //     issue.fields.assignee?.accountId === key && issue.fields.status.name === 'Closed',
      // ).length
      // console.log('taskCount', taskCount)
      // console.log('openStatusCount', openStatusCount)
      // console.log('inProgressStatusCount', inProgressStatusCount)
      // console.log('closeStatusCount', closeStatusCount)
    }

    setTeamData(teamArr)

    return () => {}
  }, [list])

  return (
    <div>
      {teamData.length > 0 ? (
        <div>
          <p>TeamInsights</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>All task count</th>
                <th>Issue type count</th>
                <th>Issue status count</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((team, i) => {
                return (
                  <tr key={i}>
                    <td>{team.displayName}</td>
                    <td>
                      {
                        list.filter((issue) => issue.fields.assignee?.accountId === team.accountId)
                          .length
                      }
                    </td>
                    <td>{renderIssueType(team.accountId)}</td>
                    <td>{renderIssueStatus(team.accountId)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      <br />
    </div>
  )
}

export default TeamInsights
