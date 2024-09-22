const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Helper function to process the data
function processData(data) {
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(char => char.toLowerCase() === char);
    const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || [];

    return {
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };
}

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: 'Invalid input data' });
    }

    const processedData = processData(data);

    const response = {
        is_success: true,
        user_id: 'om_sai_vasireddy_22042004', // Replace with actual user ID logic
        email: 'omsai_vasireddy@srmap.edu.in', // Replace with actual email
        roll_number: 'AP21110011282', // Replace with actual roll number
        ...processedData,
        file_valid: !!file_b64,
        file_mime_type: file_b64 ? 'application/octet-stream' : undefined, // Replace with actual MIME type detection
        file_size_kb: file_b64 ? Math.ceil(file_b64.length * 0.75 / 1024) : undefined
    };

    res.json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});