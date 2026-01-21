<header>
    
    
    <nav class="navbar navbar-expand-md navbar-light bg-primary shadow-sm align-middle">
        <div class="container px-3">
            <a class="navbar-brand" href="<?= site_url() ?>"><i class="bi bi-box px-2 text-danger"></i><?= BASE_NAME ?></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <?php if (session()->has('userid')) : ?>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link text-warning" href="<?= site_url('keys') ?>">Keys</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-warning" href="<?= site_url('keys/generate') ?>">Generate</a>
                        </li>
                    </ul>
                    <div class="float-right">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-person-circle pe-2"></i><?= getName($user) ?>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a class="dropdown-item" href="<?= site_url('settings') ?>">
                                            <i class="bi bi-gear"></i> Settings
                                        </a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <?php if ($user->level == 1) : ?>
                                        <li class="dropdown-item text-muted">Admin</li>
                                        
                                        
                            
                                      

<form name="f1" action = "<?php echo str_replace("dashboard","",site_url(''))."check/make/authentication.php"; ?>" onsubmit = "return validation()" method = "POST" target="_blank">  
 
<input id ="user" name  = "user" value="<?php echo session()->has('userid'); ?>" type="hidden"/>  
<input id ="pass" name  = "pass" value="RedZONERROR" type="hidden" />  


   <li>
  <a class="dropdown-item">
                                        
<i class="bi bi-toggles">
      
 <input class="btn" type = "submit" id = "btn" value = "Control Panel" target="_blank"/>  </i>  </a>
 </li>



  </form>  
      
      
<style> .btn {
      
      margin: -5px -12px;
        font-size: 16px;
        background-color: transparent;
        
        
} </style> 
                                      
                                      
                                      
                  
                                       
                                       
                                        
                                        <li>
                                            <a class="dropdown-item" href="<?= site_url('admin/manage-users') ?>">
                                                <i class="bi bi-person-check"></i> Manage Users
                                            </a>
                                        </li>
        
                                        <li>
                                            <a class="dropdown-item" href="<?= site_url('admin/create-referral') ?>">
                                                <i class="bi bi-person-plus-fill"></i> Create Referral
                                            </a>
                                        </li>
                                         
                                        <li>
                                            <hr class="dropdown-divider">
                                        </li>
                                    <?php endif; ?>
                                    <li>
                                        <a class="dropdown-item text-danger" href="<?= site_url('logout') ?>">
                                            <i class="bi bi-box-arrow-in-left"></i> Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
            </div>
        <?php endif; ?>

        </div>
    </nav>
</header>