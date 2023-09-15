document.addEventListener("DOMContentLoaded", function () {
    // Sample log data (you can replace this with your actual data)
    const logData = [
        { instructorName: "John Doe", status: "Completed", duration: "2 hours", dateCreated: "2023-09-15", lastUpdate: "2023-09-15 14:30:00" },
        {
			instructorName: "Alice Smith",
			status: "In Progress",
			duration: "1.5 hours",
			dateCreated: "2023-09-14",
			lastUpdate: "2023-09-14 13:45:00"
		},
		{
			instructorName: "Bob Johnson",
			status: "Completed",
			duration: "3 hours",
			dateCreated: "2023-09-13",
			lastUpdate: "2023-09-13 15:20:00"
		},
		{
			instructorName: "Eva Brown",
			status: "Canceled",
			duration: "1 hour",
			dateCreated: "2023-09-12",
			lastUpdate: "2023-09-12 10:10:00"
		},
		{
			instructorName: "David Lee",
			status: "Completed",
			duration: "2.5 hours",
			dateCreated: "2023-09-11",
			lastUpdate: "2023-09-11 14:15:00"
		},
		{
			instructorName: "Sophia Wilson",
			status: "In Progress",
			duration: "2 hours",
			dateCreated: "2023-09-10",
			lastUpdate: "2023-09-10 12:30:00"
		},
		{
			instructorName: "Oliver Adams",
			status: "In Progress",
			duration: "1.5 hours",
			dateCreated: "2023-09-09",
			lastUpdate: "2023-09-09 11:20:00"
		},
		{
			instructorName: "Emma White",
			status: "Completed",
			duration: "2 hours",
			dateCreated: "2023-09-08",
			lastUpdate: "2023-09-08 14:45:00"
		},
		{
			instructorName: "Liam Davis",
			status: "Completed",
			duration: "3 hours",
			dateCreated: "2023-09-07",
			lastUpdate: "2023-09-07 16:10:00"
		},
		{
			instructorName: "Ava Martin",
			status: "In Progress",
			duration: "2.5 hours",
			dateCreated: "2023-09-06",
			lastUpdate: "2023-09-06 15:30:00"
		},
		{
			instructorName: "Noah Harris",
			status: "Canceled",
			duration: "1 hour",
			dateCreated: "2023-09-05",
			lastUpdate: "2023-09-05 10:05:00"
		},
		{
			instructorName: "Mia Clark",
			status: "Completed",
			duration: "2 hours",
			dateCreated: "2023-09-04",
			lastUpdate: "2023-09-04 13:55:00"
		},
		{
			instructorName: "William Anderson",
			status: "In Progress",
			duration: "1.5 hours",
			dateCreated: "2023-09-03",
			lastUpdate: "2023-09-03 12:40:00"
		},
		{
			instructorName: "Sofia Rodriguez",
			status: "In Progress",
			duration: "2 hours",
			dateCreated: "2023-09-02",
			lastUpdate: "2023-09-02 11:15:00"
		},
		{
			instructorName: "James Martinez",
			status: "Completed",
			duration: "3 hours",
			dateCreated: "2023-09-01",
			lastUpdate: "2023-09-01 14:20:00"
		},
		{
			instructorName: "Olivia Young",
			status: "Completed",
			duration: "2.5 hours",
			dateCreated: "2023-08-31",
			lastUpdate: "2023-08-31 15:25:00"
		},
		{
			instructorName: "Benjamin King",
			status: "In Progress",
			duration: "2 hours",
			dateCreated: "2023-08-30",
			lastUpdate: "2023-08-30 12:50:00"
		},
		{
			instructorName: "Charlotte Taylor",
			status: "Canceled",
			duration: "1.5 hours",
			dateCreated: "2023-08-29",
			lastUpdate: "2023-08-29 10:30:00"
		},
		{
			instructorName: "Henry Garcia",
			status: "Completed",
			duration: "2 hours",
			dateCreated: "2023-08-28",
			lastUpdate: "2023-08-28 14:35:00"
		},
		{
			instructorName: "Amelia Lewis",
			status: "In Progress",
			duration: "3 hours",
			dateCreated: "2023-08-27",
			lastUpdate: "2023-08-27 16:05:00"
		}
        // Add more log objects here
    ];
	const logsPerPage = 6;
    let currentPage = 1;
    let selectedStatus = "all"; // Default to show all logs

    const statusSelect = document.getElementById("status");
    const tableBody = document.querySelector("tbody");

    // Calculate the total number of pages
    const totalPages = Math.ceil(logData.length / logsPerPage);

    // Function to filter and display logs for the current page
    function displayLogs() {
        tableBody.innerHTML = ""; // Clear the table body

        const startIndex = (currentPage - 1) * logsPerPage;
        const endIndex = startIndex + logsPerPage;

        let filteredLogs = logData;

        // Filter by status if not "all"
        if (selectedStatus !== "all") {
            filteredLogs = logData.filter((log) => log.status === selectedStatus);
        }

        for (let i = startIndex; i < endIndex && i < filteredLogs.length; i++) {
            const log = filteredLogs[i];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${log.instructorName}</td>
                <td>${log.status}</td>
                <td>${log.duration}</td>
                <td>${log.dateCreated}</td>
                <td>${log.lastUpdate}</td>
                <td><a href="#">Details</a></td>
            `;
            tableBody.appendChild(row);
        }
    }

    // Function to generate pagination links
    function generatePagination() {
        const paginationContainer = document.querySelector(".pagination ul");
        paginationContainer.innerHTML = ""; // Clear existing links

        for (let i = 1; i <= totalPages; i++) {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = i;
            listItem.appendChild(link);

            if (i === currentPage) {
                listItem.classList.add("active");
            }

            paginationContainer.appendChild(listItem);

            // Add event listener to pagination links
            link.addEventListener("click", function () {
                currentPage = i;
                displayLogs();
                updateActiveLink();

                // Scroll to the top of the table
                tableBody.scrollIntoView({ behavior: "smooth" });
            });
        }
    }

    // Function to update the active link in the pagination
    function updateActiveLink() {
        const paginationLinks = document.querySelectorAll(".pagination li");
        paginationLinks.forEach((item) => item.classList.remove("active"));
        paginationLinks[currentPage - 1].classList.add("active");
    }

    // Event listener for status filter
    statusSelect.addEventListener("change", function () {
        selectedStatus = statusSelect.value;
        currentPage = 1; // Reset to the first page when changing the filter
        displayLogs();
        generatePagination();
    });

    // Initial display of logs and pagination
    displayLogs();
    generatePagination();
});