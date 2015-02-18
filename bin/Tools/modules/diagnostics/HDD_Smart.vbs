' AUTHOR: Леонид_33 
' NAME: HDD_Smart.vbs 
' 
' Скрипт для получения SMARTа HDD 
' Может брать SMART как с локальной так и удаленной машины с выводом результата в файл в формате CSV 
' При запуске скрипта выдается окно ввода имени(IP) машины с учетными данными 
' Если хотим получить SMART с локальной машины, то ничего не указываем, если с удаленной, указываем имя(IP) машины, и, если надо, учетные данные 
' Работает на WindowsXP(SP2,SP3), Windows2003SP2, Windows2008SP1 
' Берет SMART через WMI, поэтому, что винда отдает, то отдает т.е. 
' работает только со стандартно подключенными на мать HDD IDE и SATA 
' Как бы того не хотелось, НЕ РАБОТАЕТ с рэйдами. 
' Ну не видит винда SMARTов с этих винтов и все тут. 
' 
' Если что по атрибутам неясно, можно глянуть тут 
' http://en.wikipedia.org/wiki/Self-Monitoring%2C_Analysis%2C_and_Reporting_Technology 

Dim strComputer 
Dim strLogin 
Dim strPassword 
On Error Resume Next 
'GetPassword() 
   strComputer = "." 
   strLogin = "" 
   strPassword = "" 
   

If strLogin = "" or strComputer = "." then 
   Set    objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\WMI") 
else 
   Set objSWbemLocator = CreateObject("WbemScripting.SWbemLocator") 
   Set objWMIService = objSWbemLocator.ConnectServer(strComputer, _ 
      "root\CIMV2", _ 
      strLogin, _ 
      strPassword, _ 
      "MS_409") 
end If 

    Set    SmartDataItems = objWMIService.ExecQuery("SELECT * FROM MSStorageDriver_FailurePredictData", "WQL", 48) 

    InstanceName = Array() 
    SmartData = Array() 
    SmartLength = Array() 
    RowCount = 0 
    For Each objItem In SmartDataItems 
          Redim Preserve InstanceName(RowCount) 
          InstanceName(RowCount) = objItem.InstanceName 
          Redim Preserve SmartData(RowCount) 
          SmartData(RowCount) = objItem.VendorSpecific 
          Redim Preserve SmartLength(RowCount) 
          SmartLength(RowCount) = objItem.Length 
          RowCount = RowCount + 1 
    Next 
    Set    SmartDataItems = Nothing 

    ThresholdData = Array() 
    Redim Preserve ThresholdData(RowCount) 
    PredictFailure = Array() 
    Redim Preserve PredictFailure(RowCount) 
    Reason = Array() 
    Redim Preserve Reason(RowCount) 

    RowCount = 0 
    Set    ThresholdItems = objWMIService.ExecQuery("SELECT * FROM MSStorageDriver_FailurePredictThresholds", "WQL", 48) 
    For Each objItem In ThresholdItems 
          ThresholdData(RowCount) = objItem.VendorSpecific 
          RowCount = RowCount + 1 
    Next 
    Set    ThresholdItems = Nothing 

    RowCount = 0 
    Set    PredictStatusItems = objWMIService.ExecQuery("SELECT * FROM MSStorageDriver_FailurePredictStatus", "WQL", 48) 
    For Each objItem In PredictStatusItems 
          PredictFailure(RowCount) = objItem.PredictFailure 
          Reason(RowCount) = objItem.Reason 
          RowCount = RowCount + 1 
    Next 
    Set    PredictStatusItems = Nothing 

    Set oDict = CreateObject("Scripting.Dictionary") 
    CreateDict(oDict) 

    Set objFSO = CreateObject("Scripting.FileSystemObject") 
    
    If strComputer = "." then 
       Set objTextFile = objFSO.OpenTextFile(objFSO.GetSpecialFolder(2) & "\drp\" & "HDD_Smart.csv", 2, True) 
    else 
       Set objTextFile = objFSO.OpenTextFile(objFSO.GetSpecialFolder(2) & "\drp\" & "HDD_Smart_" & strComputer & ".csv", 2, True) 
    end If 

    For CurrentDisk = 0 to RowCount - 1 
         objTextFile.WriteLine("Drive: " & Replace(Mid(InstanceName(CurrentDisk), 9, InStr(InstanceName(CurrentDisk), "__") - 9), "_", " ")) 
         objTextFile.WriteLine("PredictFailure: " & PredictFailure(CurrentDisk)) 
         objTextFile.WriteLine("Reason: " & Reason(CurrentDisk)) 
         objTextFile.WriteLine("ID;Attribute;Type;Flag;Threshold;Value;Worst;Raw;Status;") 
         aSmartData = SmartData(CurrentDisk) 
         aThresholdData = ThresholdData(CurrentDisk) 

         If IsArray(aSmartData) AND IsArray(aThresholdData) Then 
             LastID = 0 
             For x = 2 To SmartLength(CurrentDisk) + 2 Step 12 
                  If LastID > aSmartData(x)  then 
                     x = 514 
                  else 
                     LastID = aSmartData(x)                      

                  If aSmartData(x) <> 0 Then 
                      objTextFile.Write(aSmartData(x) & ";") 
                      If oDict.Item(aSmartData(x)) = "" Then 
                            objTextFile.Write("VendorSpecific(" & aSmartData(x) & ");") 
                      else 
                            objTextFile.Write(oDict.Item(aSmartData(x)) & ";") 
                      end If 

                      If aSmartData(x + 1) MOD 2 Then 
                            objTextFile.Write("Pre-Failure;") 
                      Else 
                            objTextFile.Write("Advisory;") 
                      End If 

'                      objTextFile.Write(aSmartData(x + 1) & ";") 
                      aFlag = aSmartData(x + 1) 
                      txtFlag = "" 
                      If (aFlag And &H1) <> 0 Then txtFlag = "LC," End If 
                      If (aFlag And &H2) <> 0 Then txtFlag = txtFlag & "OC," End If 
                      If (aFlag And &H4) <> 0 Then txtFlag = txtFlag & "PR," End If 
                      If (aFlag And &H8) <> 0 Then txtFlag = txtFlag &  "ER," End If 
                      If (aFlag And &H10) <> 0 Then txtFlag = txtFlag &  "EC," End If 
                      If (aFlag And &H20) <> 0 Then txtFlag = txtFlag &  "SP," End If 
                      If txtFlag <> "" then 
                         txtFlag = Left(txtFlag, Len(txtFlag)-1 ) 
                      end If 
                      objTextFile.Write txtFlag & ";" 

                      objTextFile.Write(aThresholdData(x + 1) & ";") 'Threshold 
                      objTextFile.Write(aSmartData(x + 3) & ";")      'Value 
                      objTextFile.Write(aSmartData(x + 4) & ";")      'Worst 
                      objTextFile.Write((aSmartData(x + 8) * 65536 + aSmartData(x + 7) * 4096 + aSmartData(x + 6) * 256 + aSmartData(x + 5)) & ";")      'Raw 
                      If aSmartData(x + 3) >= aThresholdData(x + 1) Then 
                           objTextFile.WriteLine("OK;") 
                      else 
                           objTextFile.WriteLine("NOT OK;") 
                      end If 
                  end If 
                  end If 
             Next 
         else 
             objTextFile.WriteLine("NO DRIVE WITH SMART FOUND;") 
         end If 
         'objTextFile.WriteLine 
    Next 

    'objTextFile.WriteLine 
    'objTextFile.WriteLine("LC - life critical;") 
    'objTextFile.WriteLine("OC - online collection;") 
    'objTextFile.WriteLine("PR - performance related;") 
    'objTextFile.WriteLine("ER - error rate;") 
    'objTextFile.WriteLine("EC - event count;") 
    'objTextFile.WriteLine("SP - self preserving;") 
    objTextFile.Close 

    'Wscript.echo "HDD_SMART Is Done!" 

Function CreateDict(oDict) 
    oDict.Add 1, "Raw Read Error Rate" 
    oDict.Add 2, "Throughput Performance" 
    oDict.Add 3, "Spin-Up Time" 
    oDict.Add 4, "Start/Stop Count" 
    oDict.Add 5, "Reallocated Sectors Count" 
    oDict.Add 6, "Read Channel Margin" 
    oDict.Add 7, "Seek Error Rate Rate" 
    oDict.Add 8, "Seek Time Performance" 
    oDict.Add 9, "Power-On Hours (POH)" 
    oDict.Add 10, "Spin Retry Count" 
    oDict.Add 11, "Recalibration Retries Count" 
    oDict.Add 12, "Device Power Cycle Count" 
    oDict.Add 13, "Soft Read Error Rate" 
    oDict.Add 190, "HDA Temperature" 
    oDict.Add 191, "G-Sense Error Rate Frequency" 
    oDict.Add 192, "Power-Off Park Count" 
    oDict.Add 193, "Load/Unload Cycle Count" 
    oDict.Add 194, "HDA Temperature" 
    oDict.Add 195, "Hardware ECC Corrected Count" 
    oDict.Add 196, "Reallocated Event Count" 
    oDict.Add 197, "Current Pending Sector Count" 
    oDict.Add 198, "Off-Line Scan Uncorrectable Sector Count" 
    oDict.Add 199, "UltraDMA CRC Error Count" 
    oDict.Add 200, "Write Error Rate" 
    oDict.Add 201, "Soft Read Error Rate" 
    oDict.Add 202, "Address Mark Errors Frequency" 
    oDict.Add 203, "ECC errors (Maxtor: ECC Errors)" 
    oDict.Add 204, "Soft ECC Correction" 
    oDict.Add 205, "Thermal Asperity Rate (TAR)" 
    oDict.Add 206, "Flying Height" 
    oDict.Add 207, "Spin High Current" 
    oDict.Add 208, "Spin Buzz" 
    oDict.Add 209, "Offline Seek Perfomance" 
    oDict.Add 210, "Vibration During Write" 
    oDict.Add 211, "Vibration During Read" 
    oDict.Add 212, "Shock During Write" 
    oDict.Add 220, "Disk Shift" 
    oDict.Add 221, "G-Sense Error Rate" 
    oDict.Add 222, "Loaded Hours" 
    oDict.Add 223, "Load/Unload Retry Count" 
    oDict.Add 224, "Load Friction" 
    oDict.Add 225, "/Unload Cycle Count" 
    oDict.Add 226, "Load 'In'-time" 
    oDict.Add 227, "Torque Amplification Count" 
    oDict.Add 228, "Power-Off Retract Cycle" 
    oDict.Add 230, "GMR Head Amplitude" 
    oDict.Add 240, "Head Flying Hours" 
    oDict.Add 250, "Read Error Retry Rate" 
End Function 

Function GetPassword() 
    Dim IE 
    On Error Resume Next 
   Set IE = CreateObject( "InternetExplorer.Application" ) 
   With IE 
      .AddressBar = False 
      .menubar = False 
      .Navigate "about:blank" 
      .Document.Title = "Password" 
      .ToolBar        = False 
      .Resizable      = False 
      .StatusBar      = False 
      .Width          = 340 
      .Height         = 230 
   End With 
   With IE.Document.ParentWindow.Screen 
      IE.Left = (.AvailWidth  - IE.Width ) \ 2 
      IE.Top  = (.Availheight - IE.Height) \ 2 
   End With 
   Do While IE.Busy 
      WScript.Sleep 200 
   Loop 

   IE.Document.Body.InnerHTML =    "<BODY SCROLL=""NO"" BGCOLOR=""#" & BCol & """ TEXT=""#" & TCol & """>" & _ 
               "<FONT FACE=""arial"" SIZE=2>" & _ 
               "Введите имя компьютера<BR><INPUT SIZE=""40"" " & "ID=""Computer""><BR>"  &_ 
               "Пользователь<BR><INPUT SIZE=""40"" " & "ID=""Login""><BR>" &_ 
               "Пароль<BR><INPUT TYPE=""password"" SIZE=""40"" " & "ID=""Login"">" &_ 
               "<P><INPUT TYPE=""hidden"" ID=""OK"" " & "NAME=""OK"" VALUE=""0"">"& _ 
               "<INPUT TYPE=""submit"" VALUE="" OK "" " & "OnClick=""VBScript:OK.Value=1""></P>" 
   strComputer = "." 
   strLogin = "" 
   strPassword = "" 

   IE.visible = True 
   Do While IE.Document.All.OK.Value = 0 
      WScript.Sleep 200 
   Loop 

   If IE.Document.All.Computer.Value = "" then 
      strComputer = "." 
   else 
      strComputer = IE.Document.All.Computer.Value 
      If IE.Document.All.Login.Value <> "" then 
         strLogin = IE.Document.All.Login.Value 
         strPassword = IE.Document.All.Password.Value 
      else 
         strLogin = "" 
         strPassword = "" 
      end If 
   end If 
   IE.Quit 
   Set IE = Nothing 
End Function