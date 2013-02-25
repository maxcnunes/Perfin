define('vm',
    [
        'vm.category',
        'vm.shell'
    ],
    function (category, shell) {
        return {
            category: category,
            shell: shell
        };
    }
);