export function isValid(staleContents, latestContents, operationsJSON) {
    // Parse the operations JSON string into an array of objects
    let operations;

    try {
        operations = JSON.parse(operationsJSON);
    } catch {
        // Invalid operations JSON
        console.log('Ivalid type for operationsJSON was given')
        return false;
    }

    // Check if staleContents and latestContents are strings
    if (typeof staleContents !== 'string' || typeof latestContents !== 'string') {
        console.log('Ivalid type for staleContents and latestContents was given')
        return false;
    }


    // Initialize the cursor position to 0, and copy the stale contents to a new array
    let cursorPos = 0;
    const result = [...staleContents];

    // Loop through each operation
    for (const {
            op,
            chars,
            count
        }
        of operations) {
        switch (op) {
            case 'insert': {
                // Insert characters at cursor position
                const charactersToInsert = chars.split('');
                result.splice(cursorPos, 0, ...charactersToInsert);
                cursorPos += charactersToInsert.length;
                break;
            }
            case 'delete': {
                // Delete characters after cursor position
                if (cursorPos + count > result.length) {
                    // Delete went past the end of the string
                    console.log(`Error: Delete operation went past the end of the string (cursor position: ${cursorPos}, count: ${count}, string length: ${result.length})`);
                    return false;
                }
                result.splice(cursorPos, count);
                break;
            }
            case 'skip': {
                // Move cursor to new position
                cursorPos += count;
                if (cursorPos < 0 || cursorPos > result.length) {
                    // Skip went past the start or end of the string
                    console.log(`Error: Delete operation went past the end of the string (cursor position: ${cursorPos}, count: ${count}, string length: ${result.length})`);
                    return false;
                }
                break;
            }
            default: {
                // Invalid operation type
                console.log(`Invalid operation type was provided`);
                return false;
            }
        }
    }

    // Check if result matches latest contents
    if (result.join('') !== latestContents) {
        console.log(`Stalecontents after tranforming with operations do not match with latestcontents`);
        return false;
    }

    return true;
}

export default isValid;