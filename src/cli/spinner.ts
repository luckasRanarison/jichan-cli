import ora from "ora";

const spinner = ora({
    text: "Searching...\n",
    prefixText: "Jichan:",
    spinner: "dots",
});

export default spinner;
