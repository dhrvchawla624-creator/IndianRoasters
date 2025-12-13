#!/usr/bin/env node

/**
 * Verify API TypeScript files have correct .js extensions
 * This prevents Vercel serverless function crashes due to module resolution
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiDir = path.join(__dirname, '../api');

let hasErrors = false;

// Find all .ts files in api directory
function findTsFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory() && item.name !== 'node_modules') {
            files.push(...findTsFiles(fullPath));
        } else if (item.isFile() && item.name.endsWith('.ts')) {
            files.push(fullPath);
        }
    }

    return files;
}

// Check if relative imports have .js extensions
function checkImports(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const errors = [];

    lines.forEach((line, index) => {
        // Match relative imports: from './...' or from '../...'
        const importMatch = line.match(/from\s+['"](\.[^'"]+)['"]/);

        if (importMatch) {
            const importPath = importMatch[1];

            // Skip if it's already a .js file or from node_modules
            if (!importPath.endsWith('.js') && !importPath.includes('node_modules')) {
                errors.push({
                    line: index + 1,
                    path: importPath,
                    fullLine: line.trim()
                });
            }
        }
    });

    return errors;
}

console.log('🔍 Verifying API TypeScript imports...\n');

const tsFiles = findTsFiles(apiDir);

for (const file of tsFiles) {
    const errors = checkImports(file);

    if (errors.length > 0) {
        hasErrors = true;
        const relativePath = path.relative(process.cwd(), file);
        console.log(`❌ ${relativePath}:`);

        errors.forEach(error => {
            console.log(`   Line ${error.line}: ${error.fullLine}`);
            console.log(`   → Missing .js extension on: ${error.path}`);
            console.log(`   → Should be: ${error.path}.js\n`);
        });
    }
}

if (hasErrors) {
    console.log('❌ API verification failed! Add .js extensions to prevent Vercel crashes.\n');
    process.exit(1);
} else {
    console.log('✅ All API imports have correct .js extensions!\n');
    process.exit(0);
}
