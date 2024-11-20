document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("table-body");
    const addRowButton = document.getElementById("add-row");
    const calculateButton = document.getElementById("calculate-cgpa");
    const resultDisplay = document.getElementById("result");

    // Mapping of letter grades to grade points
    const gradeMapping = {
        "O": 10,
        "A+": 9,
        "A": 8,
        "B+": 7,
        "B": 6,
        "C+": 5,
        "C": 4,
        "P": 3,
        "F": 0
    };

    // Add new row for subject input
    addRowButton.addEventListener("click", () => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="text" placeholder="Subject Name"></td>
            <td>
                <select class="grade" aria-label="Select Grade">
                    <option value="">Select Grade</option>
                    <option value="O">O</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="P">P</option>
                    <option value="F">F</option>
                </select>
            </td>
            <td><input type="number" class="credit" min="0" placeholder="Credits"></td>
            <td><button class="remove-row">Remove</button></td>
        `;
        tableBody.appendChild(newRow);

        // Add functionality to remove button
        newRow.querySelector(".remove-row").addEventListener("click", () => {
            newRow.remove();
        });
    });

    // Calculate CGPA
    calculateButton.addEventListener("click", () => {
        let totalGradePoints = 0;
        let totalCredits = 0;

        const rows = tableBody.querySelectorAll("tr");
        rows.forEach(row => {
            const grade = row.querySelector(".grade").value;
            const credit = parseFloat(row.querySelector(".credit").value) || 0;

            const gradePoint = gradeMapping[grade] || 0;

            totalGradePoints += gradePoint * credit;
            totalCredits += credit;
        });

        const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
        resultDisplay.textContent = `Your CGPA: ${cgpa}`;
    });

    // Remove row functionality
    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-row")) {
            e.target.parentElement.parentElement.remove();
        }
    });
});
