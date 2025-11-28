#!/bin/bash

echo "🔍 Verificando configuración del proyecto..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de checks
PASSED=0
FAILED=0

check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} $2"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} $2 (Falta: $1)"
    ((FAILED++))
  fi
}

check_dir() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✓${NC} $2"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} $2 (Falta: $1)"
    ((FAILED++))
  fi
}

echo "📁 Estructura de carpetas:"
check_dir "src/app" "Carpeta app"
check_dir "src/features" "Carpeta features"
check_dir "src/shared" "Carpeta shared"
check_dir "src/layouts" "Carpeta layouts"
check_dir "src/pages" "Carpeta pages"
check_dir "src/services" "Carpeta services"
check_dir "src/store" "Carpeta store"
check_dir "src/assets" "Carpeta assets"
check_dir "src/tests" "Carpeta tests"

echo ""
echo "⚙️  Archivos de configuración:"
check_file "package.json" "package.json"
check_file "tsconfig.json" "TypeScript config"
check_file "vite.config.ts" "Vite config"
check_file "vitest.config.ts" "Vitest config"
check_file "eslint.config.js" "ESLint config"
check_file ".prettierrc" "Prettier config"
check_file ".env.example" ".env.example"
check_file ".gitignore" ".gitignore"
check_file ".editorconfig" "EditorConfig"
check_file ".nvmrc" "NVM config"

echo ""
echo "📄 Archivos base:"
check_file "index.html" "index.html"
check_file "src/main.tsx" "main.tsx"
check_file "src/app/App.tsx" "App.tsx"
check_file "src/vite-env.d.ts" "vite-env.d.ts"

echo ""
echo "🎨 Tailwind CSS:"
check_file "src/assets/styles/index.css" "Tailwind CSS config"

echo ""
echo "🛠  Utilidades:"
check_file "src/shared/utils/logger.ts" "Logger utility"
check_file "src/shared/utils/cn.ts" "cn utility"
check_file "src/shared/utils/constants.ts" "Constants"
check_file "src/services/api/apiClient.ts" "API Client"

echo ""
echo "🧪 Testing:"
check_file "src/tests/setup.ts" "Test setup"
check_file "src/tests/utils/test-utils.tsx" "Test utils"
check_file "src/app/App.test.tsx" "Example test"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Passed: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
  echo -e "${RED}✗ Failed: $FAILED${NC}"
else
  echo -e "${GREEN}✓ Todo configurado correctamente!${NC}"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Node version
echo "📦 Versiones:"
NODE_VERSION=$(node --version 2>/dev/null || echo "No instalado")
NPM_VERSION=$(npm --version 2>/dev/null || echo "No instalado")
echo "Node: $NODE_VERSION"
echo "npm: $NPM_VERSION"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ Setup completo! Ejecuta 'npm install' para comenzar.${NC}"
  exit 0
else
  echo -e "${RED}✗ Algunos archivos faltan. Revisa la configuración.${NC}"
  exit 1
fi
