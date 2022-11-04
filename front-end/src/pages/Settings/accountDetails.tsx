import React, { useState } from "react";
import axios from "axios";
import { Form, FormControl, Button } from "react-bootstrap";

function AccountDetails(): React.ReactElement {
    const [newEmail, setNewEmail] = useState<string>("");
    const [confirmNewEmail, setConfirmNewEmail] = useState<string>("");
    const [newEmailPassword, setNewEmailPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");

    async function onChangeEmail(): Promise<void> {
        try {
            const accessToken: string | null = localStorage.getItem("accessToken");
            if (accessToken === null) throw new Error("Access denied");
            if (newEmail !== confirmNewEmail) throw new Error("Emails are not identical");
            await axios.put("/api/user/email",
                { email: newEmail, password: newEmailPassword },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
                .catch(function (err) {
                    throw new Error(err);
                });
        } catch (err) {
            alert(err);
        } finally {
            clearAllFields();
        }
    };

    async function onChangePassword(): Promise<void> {
        try {
            const accessToken: string | null = localStorage.getItem("accessToken");
            if (accessToken === null) throw new Error("Access denied");
            if (newPassword !== confirmNewPassword) throw new Error("Passwords are not identical");
            await axios.put("/api/user/password",
                { password: oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
                .catch(function (err) {
                    throw new Error(err);
                });
        } catch (err) {
            alert(err);
        } finally {
            clearAllFields();
        }
    };

    function clearAllFields(): void {
        setNewEmail("");
        setConfirmNewEmail("");
        setNewEmailPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setOldPassword("");
    };

    return (
        <div className="settings-subpage-container">
            <h2 className="settings-subpage-header"> Account Details</h2>
            <div className="settings-ad-container">
                <div className="settings-ad-sub-container">
                    <span>Change Email:</span>
                    <div className="settings-ad-form-container">
                        <Form className="form-group">
                            <FormControl className="form-item settings-ad-form-item" type="email" placeholder="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                            <FormControl className="form-item settings-ad-form-item" type="email" placeholder="Confirm New Email" value={confirmNewEmail} onChange={(e) => setConfirmNewEmail(e.target.value)}/>
                            <FormControl className="form-item settings-ad-form-item" type="password" placeholder="Password" value={newEmailPassword} onChange={(e) => setNewEmailPassword(e.target.value)}/>
                            <Button className="form-item settings-ad-form-item" variant="danger" onClick={() => { void onChangeEmail(); }}>Change Email</Button>
                        </Form>
                    </div>
                </div>
                <div className="settings-ad-sub-container">
                    <span>Change Password:</span>
                    <div className="settings-ad-form-container">
                        <Form className="form-group">
                            <FormControl className="form-item settings-ad-form-item" type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            <FormControl className="form-item settings-ad-form-item" type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                            <FormControl className="form-item settings-ad-form-item" type="password" placeholder="Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                            <Button className="form-item settings-ad-form-item" variant="danger" onClick={() => { void onChangePassword(); }}>Change Password</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;
