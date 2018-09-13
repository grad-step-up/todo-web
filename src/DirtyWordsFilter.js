import React from "react";

export default function filterDirtyWords(WrappedComponent) {
    function replaceDirties(text) {
        return text.replace(/fuck|Bitch/gi, "****");
    }

    return (props) => {
        const { articles, ...other } = props;
        let filteredArticles = articles.map((value) => ({
            title: replaceDirties(value.title),
            text: replaceDirties(value.text)
        }));
        return <WrappedComponent articles={filteredArticles} {...other} />
    };
};