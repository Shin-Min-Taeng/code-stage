const extensionToLanguageMap: {
    [key: string]: string
} = {
    'js': 'javaScript',
    'ts': 'typeScript',
    'py': 'python',
    'java': 'java',
    'cpp': 'c++',
    'cs': 'csharp',
    'rb': 'ruby',
    'go': 'go',
    'php': 'php',
    'swift': 'swift',
    'kt': 'kotlin',
    'kts': 'kotlin',
    'html': 'html',
    'css': 'css',
    'json': 'json',
    'xml': 'xml',
    'rs': 'rust',
    'sh': 'shell',
};

export default class LanguageUtil {
    private constructor() {
    }

    static getLanguage(extension: string): string {
        const normalizedExt = extension.toLowerCase();
        return extensionToLanguageMap[normalizedExt] || 'Unknown';
    }
}