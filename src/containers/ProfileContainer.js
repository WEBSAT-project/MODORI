import React from "react";
import SetProfile from "../components/Main/SetProfile";

const ProfileContainer = ({ postCode }) => {
    const onDelete = () => {
        console.log(postCode);
    };
    const onUpdate = () => {
        console.log(postCode);
    };
    return <SetProfile onDelete={onDelete} onUpdate={onUpdate} />;
};

export default ProfileContainer;
