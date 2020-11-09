import React from "react";

const NotFound = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                userSelect: "none",
            }}
        >
            <img
                src="https://media.discordapp.net/attachments/746254315827757058/774191974152011786/-.png?width=575&height=677"
                alt="모도리 로고"
                width="10%"
            />
            <h1>Not Found 404</h1>
        </div>
    );
};

export default NotFound;
