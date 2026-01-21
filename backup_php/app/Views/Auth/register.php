<?= $this->extend('Layout/Starter') ?>

<?= $this->section('content') ?>

<div class="row justify-content-center pt-5">
    <div class="col-lg-4">
        <?= $this->include('Layout/msgStatus') ?>
        <div class="card shadow-sm mb-5">
            <div class="card-header h5 p-3">
                Register
            </div>
            <div class="card-body">
                <?= form_open() ?>

                <div class="form-group mb-3">
                    <label for="username">Username</label>
                    <input type="text" class="form-control mt-2" name="username" id="username" aria-describedby="help-username" placeholder="Your username" minlength="4" maxlength="111" value="<?= old('username') ?>" required>
                    <?php if ($validation->hasError('username')) : ?>
                        <small id="help-username" class="form-text text-danger"><?= $validation->getError('username') ?></small>
                    <?php endif; ?>
                </div>
                <div class="form-group mb-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control mt-2" name="password" id="password" aria-describedby="help-password" placeholder="Your password" minlength="5" maxlength="111" required>
                    <?php if ($validation->hasError('password')) : ?>
                        <small id="help-password" class="form-text text-danger"><?= $validation->getError('password') ?></small>
                    <?php endif; ?>
                </div>
                <div class="form-group mb-3">
                    <label for="password2">Confirm Password</label>
                    <input type="password" name="password2" id="password2" class="form-control mt-2" placeholder="Confirm password" aria-describedby="help-password2" minlength="5" maxlength="111" required>
                    <?php if ($validation->hasError('password2')) : ?>
                        <small id="help-password2" class="form-text text-danger"><?= $validation->getError('password2') ?></small>
                    <?php endif; ?>
                </div>
                <div class="form-group mb-3">
                    <label for="referral">Referral Code</label>
                    <input type="text" name="referral" id="referral" class="form-control mt-2" placeholder="Referral code" aria-describedby="help-referral" value="<?= old('referral') ?>" maxlength="111" required>
                    <?php if ($validation->hasError('referral')) : ?>
                        <small id="help-referral" class="form-text text-danger"><?= $validation->getError('referral') ?></small>
                    <?php endif; ?>
                </div>
                <div class="form-group mb-2">
                    <button type="submit" class="btn btn-outline-primary"><i class="bi bi-box-arrow-in-right"></i> Register now</button>
                </div>
                <?= form_close() ?>

            </div>
        </div>
        <p class="text-center text-muted after-card">
            <small class="bg-white px-auto p-2 rounded">
                Already have an account?
                <a href="<?= site_url('login') ?>" class="text-success">Login here</a>
            </small>
        </p>
    </div>
</div>

<pre>
   
<?= $this->endSection() ?>