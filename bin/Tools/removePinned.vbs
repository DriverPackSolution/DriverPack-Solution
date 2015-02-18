Option Explicit

Const CSIDL_APPDATA = &H1A

Dim objShell
Dim objFolder
Dim objFolderItem
Dim objVerb
Dim i
Dim intOpMode
Dim objCurrentUserAppData
Dim objWshShell
Dim strArguments
Dim strOptionsMessage
Dim strCurrentUserAppData
Set objShell = CreateObject("Shell.Application")
Set objCurrentUserAppData = objShell.NameSpace(CSIDL_APPDATA)
strCurrentUserAppData = objCurrentUserAppData.Self.Path

Dim blnPinned
Dim blnTaskbar
Dim strPath


Private Function intParseCmdLine(arrArguments, strPath, blnTaskbar, strOptionsMessage)

    ON ERROR RESUME NEXT

    Dim i
    Dim strFlag
    Dim strSwitchValue

    strFlag = arrArguments(0)
    Err.Clear()

    'Help is needed
    If (strFlag = "") OR (strFlag="help") OR (strFlag="/h") OR (strFlag="\h") OR (strFlag="-h") _
        OR (strFlag = "\?") OR (strFlag = "/?") OR (strFlag = "?") OR (strFlag="h") Then
        intParseCmdLine = CONST_SHOW_USAGE
        Exit Function
    End If

    strOptionsMessage = strOptionsMessage & ""  & VbCrLf
    strOptionsMessage = strOptionsMessage & WScript.ScriptName  & VbCrLf
    strOptionsMessage = strOptionsMessage & ""  & VbCrLf
    strOptionsMessage = strOptionsMessage & "Command Line Options:"  & vbCrLf
    strOptionsMessage = strOptionsMessage & "======================================="  & VbCrLf

    For i = 0 to UBound(arrArguments)
        strFlag = Left(arrArguments(i), InStr(1, arrArguments(i), ":")-1)
        If Err.Number Then            'An error occurs if there is no : in the string
            Err.Clear
            Select Case LCase(arrArguments(i))
                Case "/q"
                    blnQuiet = True
                    strOptionsMessage = strOptionsMessage & "Supress Console Output: " & blnQuiet & VbCrLf
                Case "/taskbar"
                    blnTaskbar = True
                    strOptionsMessage = strOptionsMessage & "Pin to Taskbar instead of Start Menu: " & blnTaskbar & VbCrLf
                Case Else
                    Wscript.Echo arrArguments(i) & " is not recognized as a valid input."
                    intParseCmdLine = CONST_ERROR
                    Exit Function
            End Select
        Else
            strSwitchValue = Right(arrArguments(i), Len(arrArguments(i))-(Len(strFlag)+1))
            Select Case LCase(strFlag)
                Case "/item"
                    strPath = strSwitchValue
                    strOptionsMessage = strOptionsMessage & "Item to pin to Start Menu or Taskbar: " & strPath & VbCrLf
                Case else
                    Wscript.Echo "Invalid flag " & strFlag & "."
                    Wscript.Echo "Please check the input and try again."
                    intParseCmdLine = CONST_ERROR
                    Exit Function
            End Select
        End If
    Next

    If (strPath = "") Then
        Wscript.Echo "The /item switch is required"
        Wscript.Echo "Please check the input and try again."
        intParseCmdLine = CONST_ERROR
        Exit Function
    End If

    intParseCmdLine = CONST_PROCEED

End Function

'===================''==================='
' - Remove All Pinned Items -
'===================''==================='

For i = 0 to Wscript.arguments.count - 1
    ReDim Preserve arrArguments(i)
    arrArguments(i) = Wscript.arguments.item(i)
Next

intOpMode = intParseCmdLine(arrArguments, strPath, blnTaskbar, strOptionsMessage)

Set objFolder = objShell.Namespace(strCurrentUserAppData & "\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar")
For Each objFolderItem in objFolder.Items
  If (objFolderItem.name = strPath) Then
    For Each objVerb in objFolderItem.Verbs
        If Replace(objVerb.name, "&", "") = "Unpin from Taskbar" Or Replace(objVerb.name, "&", "") = "Открепить от панели задач" Then objVerb.DoIt
      Next
  End If
Next