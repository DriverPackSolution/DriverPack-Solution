' Windows Script Host Sample Script
'
' ------------------------------------------------------------------------
'               Copyright (C) 2009 Microsoft Corporation
'
' You have a royalty-free right to use, modify, reproduce and distribute
' the Sample Application Files (and/or any modified version) in any way
' you find useful, provided that you agree that Microsoft and the author
' have no warranty, obligations or liability for any Sample Application Files.
' ------------------------------------------------------------------------

'********************************************************************
'*
'* File:           PinItem.vbs
'* Date:           03/04/2009
'* Version:        1.0.2
'*
'* Main Function:  VBScipt to pin an item to the Start Menu or Taskbar
'*
'* Usage:  cscript PinItem.vbs /item:<path to exe>
'*                 [/taskbar] [/?]
'*
'* Copyright (C) 2009 Microsoft Corporation
'*
'* Revisions:
'*
'* 1.0.0 - 04/03/2008 - Created.
'* 1.0.1 - 03/02/2009 - Used Replace in PinItem function to remove "&" 
'*                      from verb.
'* 1.0.2 - 03/04/2009 - Script name was PinToStartMenu.vbs.  Added 
'*                      /taskbar switch to pin items to taskbar on
'*                      Win7.
'*
'********************************************************************


'*****************************************************************************
'* Declare Variables
'*****************************************************************************

Option Explicit
'On Error Resume Next

Dim blnPinned
Dim blnTaskbar

Dim i
Dim intOpMode

Dim objWshShell
Dim objFSO
Dim objShell

Dim strPath
Dim strArguments
Dim strOptionsMessage

' Define constants
Const CONST_ERROR               = 0
Const CONST_WSCRIPT             = 1
Const CONST_CSCRIPT             = 2
Const CONST_SHOW_USAGE          = 3
Const CONST_PROCEED             = 4
Const CONST_STRING_NOT_FOUND    = -1
Const CONST_FOR_READING         = 1
Const CONST_FOR_WRITING         = 2
Const CONST_FOR_APPENDING       = 8
Const CONST_Success             = 0
Const CONST_Failure             = 1

Const TRISTATE_USE_DEFAULT      = -2
Const TRISTATE_TRUE             = -1  'Open the file as Unicode. 
Const TRISTATE_FALSE            = 0   'Open the file as ASCII. 

blnTaskbar = False

'*****************************************************************************
'* Create Objects
'*****************************************************************************

Set objWshShell = CreateObject("Wscript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("Shell.Application")


'********************************************************************
'* Check script host exe and parse command line
'********************************************************************

'Get the command line arguments
For i = 0 to Wscript.arguments.count - 1
    ReDim Preserve arrArguments(i)
    arrArguments(i) = Wscript.arguments.item(i)
Next

'Check whether the script is run using CScript
Select Case intChkProgram()
    Case CONST_CSCRIPT
        'Do Nothing
    Case CONST_WSCRIPT
        WScript.Echo "Please run this script using CScript." & vbCRLF & _
            "This can be achieved by" & vbCRLF & _
            "1. Using ""CScript MODIFYUSERS.vbs arguments"" for Windows 95/98 or" & VbCrLf & _
            "2. Changing the default Windows Scripting Host setting to CScript" & vbCRLF & _
            "    using ""CScript //H:CScript //S"" and running the script using" & vbCRLF & _
            "    ""MODIFYUSERS.vbs arguments"" for Windows NT."
        WScript.Quit
    Case Else
        WScript.Quit
End Select

'Parse the command line
Err.Clear()
intOpMode = intParseCmdLine(arrArguments, strPath, blnTaskbar, strOptionsMessage)

If Err.Number Then
    Wscript.Echo "Error 0X" & CStr(Hex(Err.Number)) & " occurred in parsing the command line."
    If Err.Description <> "" Then
        Wscript.Echo "Error description: " & Err.Description & "."
    End If
    'WScript.quit
End If

Select Case intOpMode
    Case CONST_SHOW_USAGE
        Call ShowUsage()
        WScript.quit
    Case CONST_PROCEED
        'Do nothing.
    Case CONST_ERROR
        WScript.quit
    Case Else
        Wscript.Echo "Error occurred in passing parameters."
End Select


'********************************************************************
'* Main Script
'********************************************************************

WScript.Echo strOptionsMessage

blnPinned = PinItem(strPath, blnTaskbar)
WScript.Echo "Item pinned: " & CStr(blnPinned)

If blnPinned Then
    WScript.Quit(0)
Else
    WScript.Quit(1)
End If


'********************************************************************
'*
'* Function intChkProgram()
'*
'* Purpose:  Determines which program is used to run this script.
'*
'* Input:    None
'*
'* Returns:  intChkProgram is set to one of CONST_ERROR, CONST_WSCRIPT,
'*           and CONST_CSCRIPT.
'*
'********************************************************************
Private Function intChkProgram()

    ON ERROR RESUME NEXT

    Dim i
    Dim j
    Dim strFullName
    Dim strCommand

    'strFullName should be something like C:\WINDOWS\COMMAND\CSCRIPT.EXE
    strFullName = WScript.FullName
    If Err.Number then
        Wscript.Echo "Error 0x" & CStr(Hex(Err.Number)) & " occurred."
        If Err.Description <> "" Then
            Wscript.Echo "Error description: " & Err.Description & "."
        End If
        intChkProgram =  CONST_ERROR
        Exit Function
    End If

    i = InStr(1, strFullName, ".exe", 1)
    If i = 0 Then
        intChkProgram =  CONST_ERROR
        Exit Function
    Else
        j = InStrRev(strFullName, "\", i, 1)
        If j = 0 Then
            intChkProgram =  CONST_ERROR
            Exit Function
        Else
            strCommand = Mid(strFullName, j+1, i-j-1)
            Select Case LCase(strCommand)
                Case "cscript"
                    intChkProgram = CONST_CSCRIPT
                Case "wscript"
                    intChkProgram = CONST_WSCRIPT
                Case Else       'should never happen
                    Wscript.Echo "An unexpected program is used to run this script."
                    Wscript.Echo "Only CScript.Exe or WScript.Exe can be used to run this script."
                    intChkProgram = CONST_ERROR
            End Select
        End If
    End If

End Function


'********************************************************************
'*
'* Function intParseCmdLine()
'*
'* Purpose:  Parses the command line.
'*
'* Input:    arrArguments              An array containing input from the command line
'*
'* Input:    strPath                   Path of exe to pin
'*           strOptionsMessage         String containing options selected
'*
'* Returns:  intParseCmdLine is set to one of CONST_ERROR, CONST_SHOW_USAGE,
'*           and CONST_PROCEED.
'*
'********************************************************************
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


'********************************************************************
'*
'* Function PinItem()
'*
'* Purpose:  Pin item to the Start Menu.
'*
'* Input:          strlPath          Path of exe to pin
'*                 blnTaskbar        Pin item to Taskbar instead of Start Menu if true
'*
'* Dependencies:   objShell          Shell.Application object
'*                 objFSO            File System object
'*
'* Returns:        True if the shortcut is created, else false
'*
'********************************************************************
Function PinItem(strlPath, blnTaskbar)
    On Error Resume Next

    Dim colVerbs
    Dim itemverb
    
    Dim objFolder
    Dim objFolderItem

    Dim strFolder
    Dim strFile


    If objFSO.FileExists(strlPath) Then
        '***** Do nothing, folder exists

    Else
        '***** Folder does not exist
        PinItem = False
        WScript.Echo "File to pin does not exist."
        WScript.Echo "Please check the input and try again."
        Exit Function
    End If

    strFolder = objFSO.GetParentFolderName(strlPath)
    strFile = objFSO.GetFileName(strlPath)

    WScript.Echo "Folder: " & strFolder
    WScript.Echo "File: " & strFile

    Err.Clear
    Set objFolder = objShell.Namespace(strFolder)
    Set objFolderItem = objFolder.ParseName(strFile)

    ' ***** InvokeVerb for this does not work on Vista/WS2008
    'objFolderItem.InvokeVerb("P&in to Start Menu")

    ' ***** This code works on Vista/WS2008
    Set colVerbs = objFolderItem.Verbs

    If blnTaskbar Then
        For each itemverb in objFolderItem.verbs    
            If Replace(itemverb.name, "&", "") = "Закрепить на панели задач" Then 
            WScript.Echo itemverb.name
            itemverb.DoIt
            End If
        Next 
    Else
        For each itemverb in objFolderItem.verbs
            If Replace(itemverb.name, "&", "") = "Pin to Start Menu" Then itemverb.DoIt
        Next 
    End If

    If Err.Number = 0 Then
        PinItem = True
    Else
        PinItem = False
    End If
End Function


'********************************************************************
'*
'* Sub ShowUsage()
'*
'* Purpose:   Shows the correct usage to the user.
'*
'* Input:     None
'*
'* Output:    Help messages are displayed on screen.
'*
'********************************************************************
Sub ShowUsage()
    WScript.Echo "This script is used to Pin items to the Start Menu or Taskbar."
    WScript.Echo ""
    WScript.Echo "Usage: cscript " & WScript.ScriptName & " [options]"
    WScript.Echo ""
    WScript.Echo "Options:"
    WScript.Echo ""
    WScript.Echo " /item:<PathName>       Path of item to pin."
    WScript.Echo ""
    WScript.Echo " /taskbar               (Optional) Pin to Taskbar instead of Start Menu."
    WScript.Echo ""
    WScript.Echo " /?                     (Optional) Displays this help text."
    WScript.Echo ""
    WScript.Echo ""
    WScript.Echo ""
End Sub


