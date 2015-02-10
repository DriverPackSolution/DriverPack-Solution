Set shell = WScript.CreateObject("WScript.Shell")
title = WScript.Arguments.Item(0)
title2 = WScript.Arguments.Item(1)
title3 = WScript.Arguments.Item(2)
titleVista = WScript.Arguments.Item(3)

Do
    If shell.AppActivate(title) OR shell.AppActivate(title2) OR shell.AppActivate(title3) Then
        shell.SendKeys "{TAB 2}{ENTER}"
    End If
    If shell.AppActivate(titleVista) Then
        shell.SendKeys "{TAB}{ENTER}"
    End If
    WScript.Sleep 1000
Loop

