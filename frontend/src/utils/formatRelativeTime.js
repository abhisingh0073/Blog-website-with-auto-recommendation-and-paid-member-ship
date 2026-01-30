export function formatRelativeTime(dateString){
    if(!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now-date)/1000);


    if(diffInSeconds<0) return "just now";

    const units = [
       { name: "year", seconds: 31536000 },
       { name: "month", seconds: 2592000 },
       { name: "week", seconds: 604800 },
       { name: "day", seconds: 86400 },
       { name: "hour", seconds: 3600 },
       { name: "minute", seconds: 60 },
       { name: "second", seconds: 1 },
    ];

    for(const unit of units){
        if(diffInSeconds>=unit.seconds){
            const count = Math.floor(diffInSeconds/unit.seconds);
            return `${count} ${unit.name}${count !==1 ? "s" : ""} ago`
        }
    }

    return "just now";
}