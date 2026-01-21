<?php

namespace App\Controllers;

use App\Models\KeysModel;
use App\Models\FuncationModel;

class Connect extends BaseController
{
    protected $model, $game, $uKey, $sDev;

    public function __construct()
    {
        $this->maintenance = false;
        $this->model = new KeysModel();
        $this->model1 = new FuncationModel();
        $this->staticWords = "Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E";
    }

    public function index()
    {
        if ($this->request->getPost()) {
            return $this->index_post();
        } else {
            $nata = [
                "web_info" => [
                    "_client" => BASE_NAME,
                    "version" => "1.5.0",
                ],
                "web__dev" => [
                    "author" => "Mahakal1814",
                    "Website" => "https://t.me/Mahakal1814"
                ],
            ];

            return $this->response->setJSON($nata);
        }
    }

    public function index_post()
    {
        $isMT = $this->maintenance;
        $game = $this->request->getPost('game');
        $uKey = $this->request->getPost('user_key');
        $sDev = $this->request->getPost('serial');

        $form_rules = [
            'game' => 'required|alpha_dash',
            'user_key' => 'required|min_length[1]|alpha_dash|min_length[2]|max_length[36]'
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
                $model1 = $this->model1;
                $findKey = $model->getKeysGame(['user_key' => $uKey, 'game' => $game]);
                $findFuncation = $model1->getFuncation(['RedZONERROR' => "RedZONERROR", 'id_path' => 1]);
        
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
    
    
    
    
    
                     if ($findFuncation->Online !== 'true') {
                            $data = [
                                    'status' => false,
                                    'reason' => $findFuncation->Maintenance
                                ];
                        } else {
                        
                        
                        
                        
                        if ($data['status']) {
                            $devicesAdd = checkDevicesAdd($sDev, $devices, $max_dev);
                            if ($devicesAdd) {
                                if (is_array($devicesAdd)) {
                                    $model->update($id_keys, $devicesAdd);
                                }
                                // ? game-user_key-serial-word di line 15
                                $real = "$game-$uKey-$sDev-$this->staticWords";
                               
                                    if ($expired == null) {  
                               $expiredX = $time::now()->addHours($duration);
                             } else {  $expiredX = $findKey->expired_date;  }
                                 
                                
                               
                                 
                                $data = [
                                    'status' => true,
                                    'data' => [
                                        'FuckYOU' => 1,
                                        'EXP' => $expiredX, 
                                        'token' => md5($real),
                                        'Online' => $findFuncation->Online,
                                        'Bullet' => $findFuncation->Bullet,
                                        'Aimbot' => $findFuncation->Aimbot,
                                        'Memory' => $findFuncation->Memory,
                                        'ModName' => $findFuncation->ModName,
                                        
                                        'rng' => $time->getTimestamp()
                                        
                                        
                                    ],
                                ];
                            } else {
                                $data = [
                                    'status' => false,
                                    'reason' => 'MAX DEVICE REACHED'
                                ];
                            }
                        } } //ex funcation
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
    }
}
