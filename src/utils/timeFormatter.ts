const formatMeetingDate = (dateString: string, startTime: string, endTime: string | null) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const formatTime = (time: string) => {
        const [hours, minutes] = time.toString().split("T")[0].split(":");
        return new Date(2000, 0, 1, parseInt(hours), parseInt(minutes)).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    return `${formattedDate}, ${formatTime(startTime)} ${endTime ? " - " + formatTime(endTime) : ""}`;
};

export default formatMeetingDate;
