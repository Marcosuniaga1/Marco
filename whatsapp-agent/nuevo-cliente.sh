#!/bin/bash
# Crea una copia del agente lista para un nuevo cliente
# Uso: bash nuevo-cliente.sh nombre-cliente

set -e

CLIENTE=$1

if [ -z "$CLIENTE" ]; then
    echo "Uso: bash nuevo-cliente.sh nombre-cliente"
    echo "Ejemplo: bash nuevo-cliente.sh clinica-salud-total"
    exit 1
fi

DESTINO="../agentes/$CLIENTE"

if [ -d "$DESTINO" ]; then
    echo "Ya existe un agente para '$CLIENTE' en $DESTINO"
    exit 1
fi

echo ""
echo "Creando agente para: $CLIENTE"

# Copiar template completo
cp -r . "$DESTINO"

# Limpiar archivos que no van al nuevo cliente
rm -f "$DESTINO/nuevo-cliente.sh"
rm -rf "$DESTINO/.git"

# Crear .env vacío desde el ejemplo
cp "$DESTINO/.env.example" "$DESTINO/.env"

# Limpiar base de datos si existe
rm -f "$DESTINO"/*.db "$DESTINO"/*.sqlite

echo ""
echo "Agente creado en: $DESTINO"
echo ""
echo "Próximos pasos:"
echo "  1. Editar $DESTINO/config/business.yaml con los datos del cliente"
echo "  2. Editar $DESTINO/config/prompts.yaml con el system prompt"
echo "  3. Completar $DESTINO/.env con las API keys"
echo "  4. Agregar documentos del cliente en $DESTINO/knowledge/"
echo "  5. Probar: cd $DESTINO && python tests/test_local.py"
echo ""
