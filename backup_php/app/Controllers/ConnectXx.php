<?php

namespace App\Controllers;

use App\Models\KeysModel;


class Connect extends BaseController
{
    protected $model, $game, $uKey, $sDev;

    public function __construct()
    {
        $this->model = new KeysModel();
        $this->maintenance = false;
        $this->staticWords = "FuckPro3qw00easdDYFShzxhHDcAhjtFEWQDQicw";
    }

   
public function index() { try{ //try this with funcation
  
  
$isMT = $this->maintenance;
      
$tom = 'time';
$game = 'game';
$serial = 'serial';
$user_key ='user_key';

$jerry=$_REQUEST[$tom];
$game=$_REQUEST[$game];
$sDev=$_REQUEST[$serial];
$uKey=$_REQUEST[$user_key];
$sEx = 'A-Dek-Kon-Aya-BATICHOD';

        $form_rules = [
            'game' => 'required|alpha_dash',
            'user_key' => 'required|alpha_numeric|min_length[1]|max_length[321]',
            ///'serial' => 'required|alpha_dash'
        ];

        if (!$this->validate($form_rules)) {
            $data = [
                'status' => false,
                'reason' => "You entered bad parameter",
            ];
            return $this->response->setJSON($data);
        }

        if ($isMT) {
            $data = [
                'status' => false,
                'reason' => 'Server is now maintenance'
            ];
        } else {
            if (!$game or !$uKey or !$sDev) {
                $data = [
                    'status' => false,
                    'reason' => 'No parameter found'
                ];
            } else {
                $time = new \CodeIgniter\I18n\Time;
                $model = $this->model;
                $findKey = $model
                    ->getKeysGame(['user_key' => $uKey, 'game' => $game]);

                if ($findKey) {
                    if ($findKey->status != 1) {
                        $data = [
                            'status' => false,
                            'reason' => 'This key has been blocked'
                        ];
                    } else {
                        $id_keys = $findKey->id_keys;
                        $duration = $findKey->duration;
                        $expired = $findKey->expired_date;
                        $max_dev = $findKey->max_devices;
                        $devices = $findKey->devices;
    
                        function checkDevicesAdd($serial, $devices, $max_dev)
                        {
                            $lsDevice = explode(",", $devices);
                            $cDevices = isset($devices) ? count($lsDevice) : 0;
                            $serialOn = in_array($serial, $lsDevice);
    
                            if ($serialOn) {
                                return true;
                            } else {
                                if ($cDevices < $max_dev) {
                                    array_push($lsDevice, $serial);
                                    $setDevice = reduce_multiples(implode(",", $lsDevice), ",", true);
                                    return ['devices' => $setDevice];
                                } else {
                                    // ! false - devices max
                                    return false;
                                }
                            }
                        }
    
                        if (!$expired) {
                            $setExpired = $time::now()->addHours($duration);
                            $model->update($id_keys, ['expired_date' => $setExpired]);
                            $data['status'] = true;
                        } else {
                            if ($time::now()->isBefore($expired)) {
                                $data['status'] = true;
                            } else {
                                $data = [
                                    'status' => false,
                                    'reason' => 'Your key has been expired'
                                ];
                            }
                        }
    
                        if ($data['status']) {
                            $devicesAdd = checkDevicesAdd($sDev, $devices, $max_dev);
                            if ($devicesAdd) {
                                if (is_array($devicesAdd)) {
                                    $model->update($id_keys, $devicesAdd);
                                }
                                // ? game-user_key-serial-word di line 15
                                $real = "$game-$uKey-$sDev-$this->staticWords";
                               
                                    if ($expired == null) {  
                               $startTime = $time->toDateTimeString();
$expiredX = date($startTime,strtotime('+'.$findKey->duration.' hours',strtotime($startTime)));
                             } else {  $expiredX = $findKey->expired_date;  }
                                
                                 
$datetime1 = date_create($time->toDateTimeString());
        $datetime2 = date_create($jerry);
  $interval = date_diff($datetime2,$datetime1);
               
               $ddx = $interval->d;
               $hhx = $interval->h;
               $mmx = $interval->i;
               $ssx = $interval->s;
               
$expiredXx = date('Y-m-d H:i:s',strtotime('-'.$ddx.' day -'.$hhx.' hour -'.$mmx.' minutes -'.$ssx.' seconds',strtotime($expiredX)));
               
                                 
                                $data = [
                                    'status' => true,
                                   // 'data' => [
                                        'FuckYou' => false,
                                        'ExTime' => $expiredXx, 
                                        ////'Token' => md5($real),
                                        'Token' => $uKey.$sDev.$sEx,
                                        'rng' => $time->getTimestamp()
                                   // ],
                                ];
                            } else {
                                $data = [
                                    'status' => false,
                                    'reason' => 'Key already used maximum devices'
                                ];
                            }
                        }
                    }
                } else {
                    $data = [
                        'status' => false,
                        'reason' => 'Your key/game not registered'
                    ];
                }
            }
        }
///  return $this->response->setJSON($data);
        
header('Content-Type: text/plain'); $Result0=json_encode($data);
$Result1 = base64_encode($Result0); $Result2 = base64_encode('.'.$Result1);
$Result3 = base64_encode('HI> $FUcKUNLiMTAkWFIHARGyAFHHF0aD'.$Result2);
$Result4 = base64_encode('USER> $FUcKUNLiMITEdkWOQLSTjGjSEYTF0aD'.$Result3);
$Result5 = base64_encode('RedXStudio ==WTFSDIKiUAJrDHiDEMmXVkWFN0W'.$Result4);
return $this->response->setXML('➲Check[-MAKE BY @RedZONERROR-] $VaiWGUvoSQIBArWKiUmXExVkWFN0W'.$Result5);
//return $this->response->setXML($Result0);
        
    
} catch (ErrorException $e){    // catch funcation start6
  /// echo $e->getMessage();
  
  
        $isMT = $this->maintenance;
        $game = $this->request->getPost('game');
        $uKey = $this->request->getPost('user_key');
        $sDev = $this->request->getPost('serial');

        $form_rules = [
            'game' => 'required|alpha_dash'
            // 'user_key' => 'required|alpha_numeric|min_length[1]|max_length[32]',
            // 'serial' => 'required|alpha_dash'
        ];

        if (!$this->validate($form_rules)) {
            $data = [
                'status' => false,
                'reason' => "Bad Parameter",
            ];
            return $this->response->setJSON($data);
        }

        if ($isMT) {
            $data = [
                'status' => false,
                'reason' => 'MAINTENANCE'
            ];
        } else {
            if (!$game or !$uKey or !$sDev) {
                $data = [
                    'status' => false,
                    'reason' => 'INVALID PARAMETER'
                ];
            } else {
                $time = new \CodeIgniter\I18n\Time;
                $model = $this->model;
                $findKey = $model
                    ->getKeysGame(['user_key' => $uKey, 'game' => $game]);

                if ($findKey) {
                    if ($findKey->status != 1) {
                        $data = [
                            'status' => false,
                            'reason' => 'USER BLOCKED'
                        ];
                    } else {
                        $id_keys = $findKey->id_keys;
                        $duration = $findKey->duration;
                        $expired = $findKey->expired_date;
                        $max_dev = $findKey->max_devices;
                        $devices = $findKey->devices;
    
                        function checkDevicesAdd($serial, $devices, $max_dev)
                        {
                            $lsDevice = explode(",", $devices);
                            $cDevices = isset($devices) ? count($lsDevice) : 0;
                            $serialOn = in_array($serial, $lsDevice);
    
                            if ($serialOn) {
                                return true;
                            } else {
                                if ($cDevices < $max_dev) {
                                    array_push($lsDevice, $serial);
                                    $setDevice = reduce_multiples(implode(",", $lsDevice), ",", true);
                                    return ['devices' => $setDevice];
                                } else {
                                    // ! false - devices max
                                    return false;
                                }
                            }
                        }
    
                        if (!$expired) {
                            $setExpired = $time::now()->addHours($duration);
                            $model->update($id_keys, ['expired_date' => $setExpired]);
                            $data['status'] = true;
                        } else {
                            if ($time::now()->isBefore($expired)) {
                                $data['status'] = true;
                            } else {
                                $data = [
                                    'status' => false,
                                    'reason' => 'EXPIRED KEY'
                                ];
                            }
                        }
    
                        if ($data['status']) {
                            $devicesAdd = checkDevicesAdd($sDev, $devices, $max_dev);
                            if ($devicesAdd) {
                                if (is_array($devicesAdd)) {
                                    $model->update($id_keys, $devicesAdd);
                                }
                                // ? game-user_key-serial-word di line 15
                                $real = "$game-$uKey-$sDev-$this->staticWords";
                               
                                    if ($expired == null) {  
                               $expiredX = "..............";
                             } else {  $expiredX = $findKey->expired_date;  }
                                 
                                $data = [
                                    'status' => true,
                                    'data' => [
                                        'FuckYOU' => 1,
                                        'EXP' => $expiredX, 
                                        'token' => md5($real),
                                        'rng' => $time->getTimestamp()
                                    ],
                                ];
                            } else {
                                $data = [
                                    'status' => false,
                                    'reason' => 'MAX DEVICE REACHED'
                                ];
                            }
                        }
                    }
                } else {
                    $data = [
                        'status' => false,
                        'reason' => 'USER OR GAME NOT REGISTERED'
                    ];
                }
            }
        }
        return $this->response->setJSON($data);
        
        
  
  
  
} // caetch funcation end

 } // end endex funcation
    
    
    
    
    
    
  } // end main funcation


