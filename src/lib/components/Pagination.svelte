<script lang="ts">
	import clsx from 'clsx';
	// [Importing any component from lucide-svelte makes dev app reload 10 times slower · Issue #2806 · lucide-icons/lucide](https://github.com/lucide-icons/lucide/issues/2806)
	import ChevronsLeft from 'lucide-svelte/icons/chevrons-left';
	import ChevronsRight from 'lucide-svelte/icons/chevrons-right';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	export let currentPage = 1;
	export let pageSize = 10;
	export let totalCount: number;
	export let basePath: string;

	$: totalPages = Math.ceil(totalCount / pageSize);
	$: hasNext = totalPages > 0 && currentPage !== totalPages;
	$: hasPrev = currentPage > 1;

	let inputPage = currentPage;
	let isEditing = false;

	const to = (index: number) => {
		if (index === 1) return basePath;
		return `${basePath}page/${index}`;
	};

	const handlePageInput = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			const newPage = Math.min(Math.max(1, parseInt(inputPage.toString()) || 1), totalPages);
			if (newPage !== currentPage) {
				window.location.href = to(newPage);
			}
			isEditing = false;
		} else if (event.key === 'Escape') {
			inputPage = currentPage;
			isEditing = false;
		}
	};

	const handleBlur = () => {
		inputPage = currentPage;
		isEditing = false;
	};
</script>

<nav class="mt-8 flex flex-row items-center gap-2 self-center text-slate-600">
	<div class="flex items-center rounded-lg border border-slate-200 bg-white shadow-xs">
		<!-- 首页 -->
		<a
			sveltekit:prefetch
			href={to(1)}
			class={clsx(
				'flex h-9 w-9 items-center justify-center border-r border-slate-200',
				'transition-colors hover:bg-slate-50',
				!hasPrev && 'pointer-events-none opacity-50'
			)}
			aria-label="First page"
		>
			<ChevronsLeft class="h-4 w-4" />
		</a>

		<!-- 上一页 -->
		<a
			sveltekit:prefetch
			href={hasPrev ? to(currentPage - 1) : ''}
			class={clsx(
				'flex h-9 w-9 items-center justify-center border-r border-slate-200',
				'transition-colors hover:bg-slate-50',
				!hasPrev && 'pointer-events-none opacity-50'
			)}
			aria-label="Previous page"
		>
			<ChevronLeft class="h-4 w-4" />
		</a>

		<!-- 页码输入/显示 -->
		{#if isEditing}
			<input
				type="number"
				bind:value={inputPage}
				on:keydown={handlePageInput}
				on:blur={handleBlur}
				min="1"
				max={totalPages}
				class="h-9 w-16 border-none text-center focus:outline-hidden"
			/>
		{:else}
			<button on:click={() => (isEditing = true)} class="h-9 w-16 text-center hover:bg-slate-50">
				{currentPage}
			</button>
		{/if}

		<!-- 下一页 -->
		<a
			sveltekit:prefetch
			href={hasNext ? to(currentPage + 1) : ''}
			class={clsx(
				'flex h-9 w-9 items-center justify-center border-l border-slate-200',
				'transition-colors hover:bg-slate-50',
				!hasNext && 'pointer-events-none opacity-50'
			)}
			aria-label="Next page"
		>
			<ChevronRight class="h-4 w-4" />
		</a>

		<!-- 末页 -->
		<a
			sveltekit:prefetch
			href={to(totalPages)}
			class={clsx(
				'flex h-9 w-9 items-center justify-center border-l border-slate-200',
				'transition-colors hover:bg-slate-50',
				!hasNext && 'pointer-events-none opacity-50'
			)}
			aria-label="Last page"
		>
			<ChevronsRight class="h-4 w-4" />
		</a>
	</div>

	<!-- 总页数显示 -->
	<span class="text-sm text-slate-500">
		/ {totalPages}
	</span>
</nav>
